import { from, Observable } from 'rxjs';

// cold vs hot observable
// => an observable is a data-stream, that gives data over a time
// the example shown below is a cold observable
// cold means unicast
// an observable starts running as soon as there is a subscriber
//   => compared to a Promise => a Promise starts running as soon as it is created => a Promise is hot
//   => in this context observable addresses the class "Observable" unlike the class "Subject" which is also an observable

// => EACH time we subscribe on the observable, the function defined in the constructor will be called
//    => this targets the execution context
// => EACH time we subscribe we gonna get the same values
//    => this means, every subscriber gets its own execution context

const $source = new Observable(observer => {
    observer.next('Value 1');
    observer.next('Value 2');
    observer.complete();

    return () => {
        console.log('observer unsubscribed');
    };
});

// UNICAST: WE ONLY HAVE THE POSSIBILITY TO PROVIDE DATA TO ONE OBSERVER
//          AND we always provide the same data


// examples
// 1) if we remove all subscriptions nothing will be done

// explanation:
// 1) the subscribe function JUST calls the function defined in the Observable-constructor
// 2) this means every time I subscribe the function is called
// 3) and only if I subscribe the function will be called, otherwise nothing happens

$source.subscribe(v => console.log('[1] Received Value:', v));
$source.subscribe(v => console.log('[2] Received Value:', v));
$source.subscribe(v => console.log('[3] Received Value:', v));

// this examples misses the cleanup function, therefore we don't see it in the log
const $source2 = from(['Value 1', 'Value 2']);
$source2.subscribe(v => console.log('[4] Received Value:', v));
$source2.subscribe(v => console.log('[5] Received Value:', v));
$source2.subscribe(v => console.log('[6] Received Value:', v));
