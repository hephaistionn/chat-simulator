module.exports = React => {

  return React.createClass({

    propTypes: {
      label: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func.isRequired
    },

    render: function() {
      return (
        <div
          className={'button'}
          onClick={this.props.onClick}>
          {this.props.label}
        </div>
      );
    }
  });
};
