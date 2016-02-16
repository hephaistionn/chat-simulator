module.exports = React => {

  return React.createClass({

    propTypes: {
      thread: React.PropTypes.array.isRequired,
      id: React.PropTypes.string.isRequired
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
        <div className={'thread'}>
          {messagesDom}
        </div>
      );
    }
  });
};
