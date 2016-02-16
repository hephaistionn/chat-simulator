
module.exports = (React, emitter, Button, Input, Thread) => {

  return React.createClass({

    propTypes: {
      id: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      currentMessage: React.PropTypes.string.isRequired,
      labelButton: React.PropTypes.string.isRequired,
      maxLength: React.PropTypes.number.isRequired,
      thread: React.PropTypes.array.isRequired,
      onSendMessage: React.PropTypes.func.isRequired,
      onWriteMessage: React.PropTypes.func.isRequired
    },

    onWriteMessage: function(event){
      this.props.onWriteMessage(event.target.value, this.props.id)
    },

    onSendMessage: function(){
      this.props.onSendMessage(this.props.id)
    },

    render: function() {
      return (
        <div
          className={'chatBox'}
          id={this.props.id}>
          <h1>{this.props.label}</h1>
          <Thread
            thread={this.props.thread}
            />
          <Input
            value={this.props.currentMessage}
            maxLength={this.props.maxLength}
            onChange={this.onWriteMessage}
            onPressEnter={this.onSendMessage}
            />
          <Button
            label={this.props.labelButton}
            onClick={this.onSendMessage}
            />
        </div>
      );
    }
  });
};
