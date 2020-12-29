import { ReplaySubject } from 'rxjs';

// this subject "replays" the last "n" values => defined in bufferSize
// => this way subscriber won't miss values

// even if the subject is completed a subscriber will get the last "n" values

const $source = new ReplaySubject<string>(2);
$source.next('Value 1');
$source.next('Value 2');

const sub1 = $source.subscribe({
    next: v => console.log('[1] next:', v),
    error: err => console.log('[1] error:', err),
    complete: () => console.log('[1] complete!'),
});

$source.next('Value 3');
$source.next('Value 4');

const sub2 = $source.subscribe({
    next: v => console.log('[2] next:', v),
    error: err => console.log('[2] error:', err),
    complete: () => console.log('[2] complete!'),
});

$source.next('Value 5');

// source$.error('Error Message');
$source.complete();

const sub3 = $source.subscribe({
    next: v => console.log('[3] next:', v),
    error: err => console.log('[3] error:', err),
    complete: () => console.log('[3] complete!'),
});
