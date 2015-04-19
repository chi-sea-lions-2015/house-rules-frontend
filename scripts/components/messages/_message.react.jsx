var Message = React.createClass({
  render: function () {
    return (
      <div>
        <h4>Someone said: </h4>
        <p>{ this.props.message.content }</p>
      </div>
    )
  }
});

