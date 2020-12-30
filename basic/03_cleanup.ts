import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// this example shows, that
//   1) if an error is thrown, the Observer is going to unsubscribe automatically
//   2) this allows the call of the "cleanup" function
//   => if the Interval won't be killed in the cleanup-function it will continue to "emit"
//      => to test this remove "clearInterval"
const source$ = new Observable(observer => {
    observer.next('Value 1');

    let count = 2;
    const handle = setInterval(() => {
        console.log('(emitting)');
        observer.next(`Value ${count++}`);

        if (count > 5) {
            // observer.complete(); // x
            observer.error('This is an Error Message!'); // x
        }
    }, 1000);

    // cleanup/unsubscribe function
    return () => {
        console.log('(clearing interval)');
        clearInterval(handle); // x
    };
});

source$
    // the operator "take" is also a Observable,
    //   1) it will subscribe on our "source"-Observable
    //   2) and replaces our "source"-Observable
    //   3) and after those "3" values it will complete
    //      => so it will unsubscribe from the source-Observable and the cleanup-function will be called
    // .pipe(take(3)) // x
    .subscribe({
        next: v => console.log('next:', v),
        error: err => console.log('error:', err),
        complete: () => console.log('complete!'),
    });
