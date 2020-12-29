import { AsyncSubject } from 'rxjs';

// AsyncSubject emits the LAST VALUE only, once the subject completes

// all observers that subscribe to this subject won't get any notification
// all "next"-calls on this subject won't be received by any subscriber
// UNTIL the subject completes
// => than the LAST value will be sent

// BUT even if this subject is completed
// => a new subscriber will get the LAST value

const $source = new AsyncSubject<string>();

$source.next('Value 1');

const sub1 = $source.subscribe({
    next: v => console.log('[1] next:', v),
    error: err => console.log('[1] error:', err),
    complete: () => console.log('[1] complete!'),
});

$source.next('Value 2');

$source.next('Value 3');

// source$.error('Error Message');
$source.complete();

const sub2 = $source.subscribe({
    next: v => console.log('[2] next:', v),
    error: err => console.log('[2] error:', err),
    complete: () => console.log('[2] complete!'),
});
