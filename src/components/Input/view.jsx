
module.exports = React => {

  return React.createClass({

    propTypes: {
      value: React.PropTypes.string.isRequired,
      maxLength: React.PropTypes.number.isRequired,
      onChange: React.PropTypes.func.isRequired,
      onPressEnter: React.PropTypes.func.isRequired
    },

    onKeyPress: function(event){
      if(event.charCode == 13)
        this.props.onPressEnter();
    },

    render: function() {
      return (
          <input type="text"
                 value={this.props.value}
                 onChange={this.props.onChange}
                 onKeyPress={this.onKeyPress}
                 maxLength={this.props.maxLength}/>
      );
    }
  });
};
