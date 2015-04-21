var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ItemStore = require('../../stores/ItemStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ItemActionCreators = require('../../actions/ItemActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');
var APIRoot = "http://localhost:3002";

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
      url: APIRoot + "/houses/1/communal_items",
      type: "POST",
      dataType: "json",
      success: function ( data ) {
        console.log("^^^^^^^");
        console.log(data);
        this.setState({ items: data });
      }.bind(this)
    });
  },

  render: function () {
    console.log("state");
    console.log(this.state.form);
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

var Item = React.createClass({
  render: function () {
    return (
      <li className="story">
        <div className="story__name">{this.props.item.name}</div>
        <div className="story__brand">{this.props.item.brand}</div>
        <div className="story__quantity">{this.props.item.quantity}</div>
        <div className="story__stock">{this.props.item.stock_level}</div>
      </li>
    )
  }
});


var ItemList = React.createClass({

  render: function () {
    var itemNodes = this.props.items.map(function ( item ) {
      return <Item item={ item } />
    });

    return (
      <div className="item-list">
        <h2>Communal Items</h2>
        { itemNodes }
      </div>
    )
  }
});


var ItemForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();

    // var content = this.refs.content.getDOMNode().value.trim();

    var name = this.refs.name.getDOMNode().value;
    ItemActionCreators.createItem(name);
    var brand = this.refs.stock.getDOMNode().value;
    ItemActionCreators.createItem(brand);
    var quantity = this.refs.stock.getDOMNode().value;
    ItemActionCreators.createItem(quantity);
    var stock_level = this.refs.stock.getDOMNode().value;
    ItemActionCreators.createItem(stock_level);

    // validate
    if (!name) {
      return false;
    }
    if (!stock_level) {
      return false;
    }

    // submit
    var formData = $( this.refs.form.getDOMNode() ).serialize();
    this.props.onItemSubmit( formData, APIRoot + "/houses/1/communal_items" );

    // reset form
    this.refs.name.getDOMNode().value = "";
    this.refs.brand.getDOMNode().value = "";
    this.refs.quantity.getDOMNode().value = "";
    this.refs.stock.getDOMNode().value = "";
  },
  render: function () {
    return (
      <form ref="form" className="item-form" action={ APIRoot + "/houses/1/communal_items" } acceptCharset="UTF-8" method="post" onSubmit={ this.handleSubmit }>
        <p><input ref="name" name="item[name]" placeholder="What's the communal item?" /></p>
        <p><input ref="brand" name="item[brand]" placeholder="What's the brand?" /></p>
        <p><input ref="quantity" name="item[quantity]" placeholder="How many?" /></p>
        <p><input ref="stock" name="item[stock_level]" placeholder="What's the stock status?" /></p>
        <p><button type="submit">post item</button></p>
      </form>
    )
  }
});

module.exports = ItemBox;
