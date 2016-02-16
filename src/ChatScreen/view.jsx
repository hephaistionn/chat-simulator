module.exports = (React, emitter, ChatBox) => {

  return React.createClass({

    componentWillMount: function() {

      /** The view is initialized*/
      this.setState(this.props.model);

      /** The view is redrawn when 'draw' event is triggered.*/
      emitter.on('draw', function(model) {
        this.setState(model);
      }.bind(this));
    },

    componentWillUnmount: function() {
      emitter.off('draw');
    },

    onSendMessage: function(id) {
      emitter.emit('send', {id: id});
    },

    onWriteMessage: function(value, id) {
      emitter.emit('write', {value: value, id: id});
    },

    render: function() {

      if (!this.state) {
        return <div />;
      }

      return (
        <div className={'screen'}>
          <ChatBox
            id={this.state.userA.id}
            label={this.state.userA.label}
            currentMessage={this.state.userA.currentMessage}
            labelButton={this.state.labelButton}
            maxLength={this.state.maxLength}
            thread={this.state.thread}
            onWriteMessage={this.onWriteMessage}
            onSendMessage={this.onSendMessage}
            />
          <ChatBox
            id={this.state.userB.id}
            label={this.state.userB.label}
            currentMessage={this.state.userB.currentMessage}
            labelButton={this.state.labelButton}
            maxLength={this.state.maxLength}
            thread={this.state.thread}
            onWriteMessage={this.onWriteMessage}
            onSendMessage={this.onSendMessage}
            />
        </div>
      );
    }
  });
};
