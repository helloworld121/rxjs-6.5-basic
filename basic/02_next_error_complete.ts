import { concat, from, throwError } from 'rxjs';

// "from" creates a new Observable
//    => those 2 Observable should be played one after the other using "concat"
//       just after the first completes the next will be send
//       this shows also how to bring two stream together
// "concat" gonna take the next Observable after the current one completes
const source$ = concat(
    from([10, 20, 30]),
    // "throwError" creates a stream that just throws an error
    // throwError('This is an error message!'), // x
    from([40, 50, 60]),
);

source$.subscribe({
    next: v => console.log('next:', v),
    error: err => console.log('error:', err),
    complete: () => console.log('complete!'),
});
