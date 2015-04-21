var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ItemStore = require('../../stores/ItemStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ItemActionCreators = require('../../actions/ItemActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');
var APIRoot = "http://localhost:3002";

var Item = React.createClass({
  render: function () {
    return (
      <li className="story">
        <div className="story__body">{this.props.item.name}</div>
        <span className="story__user">{this.props.item.author}</span>
        <span className="story__date"> - {timeago(this.props.item.created_at)}</span>
      </li>
    )
  }
});


var ItemList = React.createClass({
  render: function () {
    var msgs = ( Array.isArray(this.props.items) ? this.props.items : this.props.items.items )
    var itemNodes = msgs.map(function ( item ) {
      return <Item item={ item } key={ item.id } />
    });

    return (
      <div className="item-list">
        { itemNodes }
      </div>
    )
  }
});

var ItemBox = React.createClass({

  getInitialState: function() {
    return {
      items: ItemStore.getAllItems(),
      errors: []
    };
  },

  componentDidMount: function() {
    ItemStore.addChangeListener(this._onChange);
    ItemActionCreators.loadItems();
  },

  componentWillUnmount: function() {
    ItemStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      items: ItemStore.getAllItems(),
      errors: ItemStore.getErrors()
    });
  },

  handleItemSubmit: function ( formData, action ) {
    $.ajax({
      data: formData,

      type: "POST",
      dataType: "json",
      success: function ( data ) {
        this.setState({ items: data });
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div className="item-box">
        <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
        <ItemList items={ this.state.items } />
        <hr />
        <ItemForm form={ this.state.form } onItemSubmit={ this.handleItemSubmit } />
      </div>
    );
  }
});

var ItemForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();

    // var content = this.refs.content.getDOMNode().value.trim();

    var name = this.refs.name.getDOMNode().value;
    ItemActionCreators.createItem(name);


    // validate
    if (!name) {
      return false;
    }

    // submit
    var formData = $( this.refs.form.getDOMNode() ).serialize();
    this.props.onItemSubmit( formData, APIRoot + "/houses/1/communal_items" );

    // reset form
    this.refs.name.getDOMNode().value = "";
  },
  render: function () {
    return (
      <form ref="form" className="item-form" action={ APIRoot + "/houses/1/communal_items" } acceptCharset="UTF-8" method="post" onSubmit={ this.handleSubmit }>
        <p><textarea ref="name" name="item[name]" placeholder="What's the communal item?" /></p>
        <p><button type="submit">post item</button></p>
      </form>
    )
  }
});

module.exports = ItemBox;
