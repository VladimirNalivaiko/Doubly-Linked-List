'use strict'

var Node = function(data){
  this.data = data;
  this.next = null;
  this.previous = null;
}

var List = function(){
  this.head = null;
  this.tail = null;
  this.length = 0;
}

List.prototype.getHead = function(){
  return this.head;
}

List.prototype.getTail = function(){
  return this.tail;
}

List.prototype.append = function(data){
  var node = new Node(data);

  if(this.length){
    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;
  }
  else{
    this.head = node;
    this.tail = node;
  }

  this.length++;

  return node;
}

List.prototype.prepend = function(data){
  var node = new Node(data);

  if(this.length){
    this.head.previous = node;
    node.next = this.head;
    this.head = node;
  }
  else{
    this.head = node;
    this.tail = node;
  }

  this.length++;

  return node;
}

List.prototype.at = function(position){
  var node = this.head, count = 0;

  while(count < position){
    node = node.next;
    count++;
  }

  return node;
}

List.prototype.insertAt = function(position, data){
  var node = this.head, count = 0;
  var newNode = new Node(data);

  while(count < position - 1){
    node = node.next;
    count++;
  }

  newNode.next = node.next;
  node.next.previous = newNode;
  node.next = newNode;  
  newNode.previous = node;

  this.length++;
}

List.prototype.deleteAt = function(position){
  var node = this.head, count = 0;

  if(position === 0){
    this.head = node.next;
    if(this.head){
      this.head.previous = null; 
    } 
    else{
      this.tail = null;
    }
  }else if(position === this.length - 1){
    this.tail = this.tail.previous;
    this.tail.next = null;    
  }else{
    while(count < position){
      node = node.next;
      count++;
    }
    node.previous.next = node.next;
    node.next.previous = node.previous;
    node = null;
  }

  this.length--;  
}

List.prototype.reverse = function(){
  var count = Math.floor(this.length / 2), tData;
  var tHead = this.head, tTail = this.tail;
  while(count >= 0){
    tData = tHead.data;
    tHead.data = tTail.data;
    tTail.data = tData;
    tHead = tHead.next;
    tTail = tTail.previous;
    count--;
  }
}

List.prototype.each = function(callback){
  var node = this.head;
  var count = 0;
  while(count < this.length){
    callback(node);
    node = node.next;
    count++;
  }
}

List.prototype.indexOf = function(data){
  var count = 0;
  var positions = [];
  var node = this.head;
  while(count < this.length){
    if(node.data == data){
      positions.push(count);
    }
    node = node.next;
    count++;
  }
  return positions;
}