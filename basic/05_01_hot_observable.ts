import { Subject } from 'rxjs';


// compared to the class "Observable" a "Subject" is a hot observable
// => THIS MEANS the SUBJECT STARTS running without a subscription
// THEREFORE it doesn't matter if someone is listening or not

// EXECUTION CONTEXT => is always there

// Subject => types: Subject/AsyncSubject/BehaviourSubject/ReplaySubject

// compared to class "Observable"
// => an observable will be executed as soon as someone subscribes
// a observable of class "Subject"
// => is always there
// => and acts as an "Emitter" it can be controlled from outside to send data (by calling .next)
// IF someone subscribes later to a "Subject" he might have missed some data

// HOT => MULTICAST

// everyone gets the same values => difference between Equality and Identity
// ger. "das gleiche "=> COLD (Equality) the same regards to its qualities
// ger. "dasselbe" => HOT (Identity) is physically the same

// SUBSCRIBER IS an implementation of OBSERVER


// in this example is no async the code runs from top to bottom


// source is created
const $source = new Subject<string>();
// source is something like a remote control to emit data

// emit data to source
$source.next('Value 1');

// adding first subscriber/observer
const sub1 = $source.subscribe({
    next: v => console.log('[1] next:', v),
    error: err => console.log('[1] error:', err),
    complete: () => console.log('[1] complete!'),
});

// emit next data
$source.next('Value 2');
// subscriber 1 gets "Value 2"

// adding a second subscription/oberserver
// this one won't get value 1 and 2
const sub2 = $source.subscribe({
    next: v => console.log('[2] next:', v),
    error: err => console.log('[2] error:', err),
    complete: () => console.log('[2] complete!'),
});

$source.next('Value 3');

sub1.unsubscribe();

$source.next('Value 4');

sub2.unsubscribe();

$source.next('Value 5');

// source$.error('Error Message');
$source.complete();

const sub3 = $source.subscribe({
    next: v => console.log('[3] next:', v),
    error: err => console.log('[3] error:', err),
    complete: () => console.log('[3] complete!'),
});
