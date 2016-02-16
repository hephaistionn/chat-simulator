module.exports = React => {

  return React.createClass({

    propTypes: {
      thread: React.PropTypes.array.isRequired
    },

    render: function() {

      const messagesDom = this.props.thread.map((data, index) => {
        return <div className={'message ' + data.id}
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
