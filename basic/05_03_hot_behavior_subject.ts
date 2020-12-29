import { BehaviorSubject } from 'rxjs';

// is something in between Subject and AsyncSubject
// => if someone subscribes to this subject he will get a DEFAULT-VALUE or the LAST EMITTED VALUE
// => after the first value he will be notified on "next"-Calls (the normal way like Subject)

// => difference to Subject
//    => if someone subscribes to a Subject he won't get any Values till "next"-Calls
//    => the BehaviorSubject has a default/last value

// it is similar to a variable, that I want to observe

// BehaviorSubject is STATEFUL => there is always a value
// => this value can be accessed in synchronous way => "$source.value"

// use-case: we want to know if a user is logged in
// => this is possible because we always ask for the current value by using "$source.value"

const $source = new BehaviorSubject<string>('Initial');

const sub1 = $source.subscribe({
    next: v => console.log('[1] next:', v),
    error: err => console.log('[1] error:', err),
    complete: () => console.log('[1] complete!'),
});

$source.next('Value 1');

const sub2 = $source.subscribe({
    next: v => console.log('[2] next:', v),
    error: err => console.log('[2] error:', err),
    complete: () => console.log('[2] complete!'),
});

$source.next('Value 2');

// source$.error('Error Message');
$source.complete();

const sub3 = $source.subscribe({
    next: v => console.log('[3] next:', v),
    error: err => console.log('[3] error:', err),
    complete: () => console.log('[3] complete!'),
});
