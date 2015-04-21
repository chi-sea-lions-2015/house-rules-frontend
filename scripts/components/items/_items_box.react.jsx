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
      <li>
        <div className="story__body">&nbsp;{this.props.item.name}</div>
        <span className="story__user">&nbsp;@{this.props.item.brand}</span>
        <span className="story__date">&nbsp;&nbsp;-{this.props.item.quantity}</span>
        <div className="story__stock_level">{this.props.item.stock_level}</div>
      </li>
    )
  }
});

var ItemList = React.createClass({
  render: function () {
    var itemNodes = this.props.items.map(function ( item ) {
      return <Item item={ item } key={ item.id } />
    });

    return (
      <div className="item-list">
      <ol>
        { itemNodes }
      </ol>
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


  render: function () {
    return (
      <div className="item-box">
        <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
        <ItemList items={ this.state.items } />
        <hr />
        <ItemForm form={ this.state.form } />
        </div>
    );
  }
});

var ItemForm = React.createClass({
  handleSubmit: function ( event ) {
    event.preventDefault();
    var name = this.refs.name.getDOMNode().value;
    var brand = this.refs.brand.getDOMNode().value;
    var quantity = this.refs.quantity.getDOMNode().value;
    var stock_level = this.refs.stock_level.getDOMNode().value;
    ItemActionCreators.createItem(name, brand, quantity, stock_level);

    // var formData = $( this.refs.form.getDOMNode() ).serialize();
    // ItemActionCreators.createItem(formData)
    if (!name) {
      return false;
    }

    // reset form
    this.refs.name.getDOMNode().value = "";
    this.refs.brand.getDOMNode().value = "";
    this.refs.quantity.getDOMNode().value = "";
  },
  render: function () {
    return (
      <form ref="form" className="item-form" method="post" onSubmit={ this.handleSubmit }>
        <fieldset>
          <legend>Create an Item</legend>
          <p><textarea ref="name" name="communal_item[name]" placeholder="What's the item?" /></p>
          <p><textarea ref="brand" name="communal_item[brand]" placeholder="What brand?" /></p>
          <p><textarea ref="quantity" name="communal_item[quantity]" placeholder="What quantity?" /></p>
          <p><select ref="stock_level" name="communal_item[stock_level]">
              <option value="high">High</option>
              <option value="low">Low</option>
              <option value="out">Out</option>
              </select></p>
          <p><button type="submit">Post item</button></p>
        </fieldset>
      </form>
    )
  }
});

module.exports = ItemBox;
