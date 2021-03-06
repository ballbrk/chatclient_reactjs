import React, { Component } from 'react';

const ErrorMessages = ({ errorMessages }) => {
  const className = errorMessages.length > 0 ? 'error' : 'noerror';
  return (
    <p className={className}>{errorMessages}</p>
  );
};
class ChatInput extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      message: '',
      showChatInput: 'hidden',
      showNickInput: 'nick',
    };

    this.onSubmitNick = this.onSubmitNick.bind(this);
    this.onSubmitChat = this.onSubmitChat.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.handleKeyPressNick = this.handleKeyPressNick.bind(this);
    this.handleKeyPressMsg = this.handleKeyPressMsg.bind(this);
  }

  onSubmitNick() {
    const { name } = this.state;
    if (name.trim().length > 0) {
      this.props.onSendNick(name);
    }
  }

  onSubmitChat() {
    const { name, message } = this.state;
    if (message.trim().length > 0) {
      this.props.onSendChat(name, message);
      this.setState({ message: '' });
    }
  }

  handleKeyPressMsg(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmitChat();
    }
  }

  handleKeyPressNick(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmitNick();
    }
  }

  updateName(event) {
    this.setState({ name: event.target.value.substr(0, 15) });
  }

  updateMessage(event) {
    this.setState({ message: event.target.value.substr(0, 200) });
  }

  render() {
    return (
      <div className="chatbox-container">
        <div className="chat-box">
          <ErrorMessages errorMessages={this.props.errorMessages} />
          <div className={(this.props.nickSuccessful === 2 && this.props.errorMessages.length === 0) ? 'show' : 'hidden'}>
            <textarea
              className="form-control"
              placeholder="Message ~ 200 Chars"
              value={this.state.message}
              onChange={this.updateMessage}
              onKeyPress={this.handleKeyPressMsg}
              ref={input => input && input.focus()}
            />
            <button type="button" onClick={this.onSubmitChat} className="btn btn-lg btn-primary btn-chat">
              <span className="glyphicon glyphicon-send" />
            </button>
          </div>
          <div className={(this.props.nickSuccessful !== 2 && this.props.errorMessages.length === 0) ? 'show' : 'hidden'} >

            <input
              type="text"
              className="form-control"
              placeholder="Set a Nickname ~ 20 Chars"
              value={this.state.name}
              onChange={this.updateName}
              onKeyPress={this.handleKeyPressNick}
              ref={nick => nick && nick.focus()}
            />
            <button type="button" onClick={this.onSubmitNick} className="btn btn-primary btn-margin" >Set Nickname</button>
          </div>
        </div>
      </div>

    );
  }
}

ChatInput.propTypes = {
  onSendNick: React.PropTypes.func.isRequired,
  onSendChat: React.PropTypes.func.isRequired,
  errorMessages: React.PropTypes.string.isRequired,
  nickSuccessful: React.PropTypes.number.isRequired,
};

ChatInput.defaultProps = {
  onSendNick: () => {},
  onSendChat: () => {},
  errorMessages: '',
  nickSuccessful: 1,
};

ErrorMessages.propTypes = {
  errorMessages: React.PropTypes.string.isRequired,
};

export default ChatInput;
