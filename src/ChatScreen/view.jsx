
module.exports = (React, emitter, ChatBox) => {

  return React.createClass({

    componentWillMount: function() {

      /** The view is initialized*/
      this.applyModel(this.props.model);

      /** The view is redarwed when 'draw' event is triggered.*/
      emitter.on('draw', function (model) {
        this.applyModel(model)
      }.bind(this));
    },

    applyModel: function(model){
      this.setState({
        idA: model.userA.id,
        idB: model.userB.id,
        currentMessageA: model.userA.currentMessage,
        currentMessageB: model.userB.currentMessage,
        maxLength: model.maxLength,
        labelA: model.userA.label,
        labelB: model.userB.label,
        labelButton: model.labelButton,
        thread: model.thread
      })
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

      if(!this.state) return <div />;

      return (
        <div  className={'screen'}>
          <ChatBox
            id={this.state.idA}
            label={this.state.labelA}
            currentMessage={this.state.currentMessageA}
            labelButton={this.state.labelButton}
            maxLength={this.state.maxLength}
            thread={this.state.thread}
            onWriteMessage={this.onWriteMessage}
            onSendMessage={this.onSendMessage}
            />
          <ChatBox
            id={this.state.idB}
            label={this.state.labelB}
            currentMessage={this.state.currentMessageB}
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
