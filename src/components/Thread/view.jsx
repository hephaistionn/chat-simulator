module.exports = React => {

  return React.createClass({

    propTypes: {
      thread: React.PropTypes.array.isRequired,
      id: React.PropTypes.string.isRequired
    },

    componentDidUpdate: function() {
      /** force scroll down */
      var node = this.refs.nav;
      node.scrollTop = node.scrollHeight;
    },

    render: function() {

      const id = this.props.id;

      const messagesDom = this.props.thread.map((data, index) => {
        const className = id === data.id ? 'message' : 'message partner';
        return <div className={className}
          key={index}>
          {data.userName + ': ' +  data.content}
        </div>;
      });

      return (
        <div ref={'nav'} className={'thread'} >
          {messagesDom}
        </div>
      );
    }
  });
};
