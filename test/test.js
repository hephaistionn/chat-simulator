/** tools test preparation */
var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var chai = require('chai');
var assert = chai.assert;

/** app preparation */
var emitter = require('event-emitter')();
var store = require('../src/store')(emitter);
var ChatScreen = require('../src/ChatScreen')(emitter);
var app = TestUtils.renderIntoDocument(<ChatScreen model={store.getModel()}/>);

/** sensors preparation */
var chatBoxA = TestUtils.scryRenderedDOMComponentsWithClass(app, 'chatBox')[0];
var chatBoxB = TestUtils.scryRenderedDOMComponentsWithClass(app, 'chatBox')[1];
var threadA = TestUtils.scryRenderedDOMComponentsWithClass(app, 'thread')[0];
var threadB = TestUtils.scryRenderedDOMComponentsWithClass(app, 'thread')[1];
var inputA = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input')[0];
var inputB = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input')[1];
var buttonA = TestUtils.scryRenderedDOMComponentsWithClass(app, 'button')[0];
var buttonB = TestUtils.scryRenderedDOMComponentsWithClass(app, 'button')[1];

/** functional test */
describe('chat scenario', function() {

  it('should not have messaes', function() {
    assert.equal(inputA.textContent, '', 'inputA is empty');
    assert.equal(inputB.textContent, '', 'inputB is empty');
    assert.equal(threadA.children.length, 0, 'threadA is empty');
    assert.equal(threadB.children.length, 0, 'threadB is empty');
    assert.equal(store.model.userA.currentMessage, '', 'userA model is empty');
    assert.equal(store.model.userB.currentMessage, '', 'userA model is empty');
  });

  it('should store message in input', function() {
    inputA.value = 'hello';
    TestUtils.Simulate.change(inputA);
    assert.equal(store.model.userA.currentMessage, 'hello');
  });

  it('should send message A', function(cb) {

    TestUtils.Simulate.click(buttonA);

    setTimeout(function() {
      assert.equal(store.model.userA.currentMessage, '', 'userA model is clear');
      assert.equal(store.model.thread[0].content, 'hello', 'thread model has saved the post');
      assert.equal(threadA.lastChild.textContent, 'chat A: hello', 'thread display the post');
      assert.equal(threadB.lastChild.textContent, 'chat A: hello', 'thread display the post');
      cb();
     },20);
  });


  it('should send message B', function(cb) {

    inputB.value = 'hello too';
    TestUtils.Simulate.change(inputB);
    TestUtils.Simulate.click(buttonB);

    setTimeout(function() {
      assert.equal(store.model.userB.currentMessage, '', 'userA model is clear');
      assert.equal(store.model.thread[0].content, 'hello', 'previous message is preserved');
      assert.equal(store.model.thread[1].content, 'hello too', 'new message is stored');
      assert.equal(threadB.lastChild.textContent, 'chat B: hello too', 'new message is display in thread');
      cb();
    },20);
  });

  it('shouldn\'t send empty message', function(cb) {

    inputB.value = '';
    TestUtils.Simulate.change(inputB);
    TestUtils.Simulate.click(buttonB);

    setTimeout(function() {
      assert.equal(store.model.thread[0].content, 'hello', 'previous message is preserved');
      assert.equal(store.model.thread[1].content, 'hello too', 'previous message is stored');
      assert.isUndefined(store.model.thread[3], 'not empty message');
      assert.equal(threadB.lastChild.textContent, 'chat B: hello too', 'new message is display in thread');
      cb();
    },20);
  });

});
