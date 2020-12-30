import { from, Observable } from 'rxjs';

// each Observer has three events: next, error, complete
// next => next value
// error => thrown by the observable => observers will auto-unsubscribe AND observable won't complete
// complete => observable completes without error => no more values will be emitted AND observers will auto-unsubscribe

// 1) Observable constructor
const source1$ = new Observable(observer => {
    observer.next('Value 1');
    observer.next('Value 2');
    // complete observable
    observer.complete();

    // cleanup function
    return () => {
        console.log('observer unsubscribed');
    };
});

source1$.subscribe(v => console.log('Received Value:', v));

// 2) Creation operator => alternative to 1) without cleanup function
const source2$ = from(['Value 1', 'Value 2']);

source2$.subscribe(v => console.log('Received Value:', v));
