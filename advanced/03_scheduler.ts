import {animationFrameScheduler, asapScheduler, asyncScheduler, of, queueScheduler} from "rxjs";
import {observeOn} from "rxjs/operators";

// the code is executed in the order that the execution-context fires

// if we change the "delay" each task will be executed as if it is wrapped in a setTimeout
// => this is caused because RxJs will be fallback to async-scheduler if we provide a delay
//    AnimationFrameAction => on delay > 0 => super - call: AsyncAction

const delay = 0;
const obs$ = of(42);

// schedules the action right before the next paint event of the browser
// obs$.pipe(observeOn(animationFrameScheduler, delay))
//     .subscribe(v => console.log('5 observable animationFrame', v));

// like wrapping code in a timeout/interval
obs$.pipe(observeOn(asyncScheduler, delay))
    .subscribe(v => console.log('4 observable async', v));

// like using a promise
obs$.pipe(observeOn(asapScheduler, delay))
    .subscribe(v => console.log('3 observable asap', v));

// synchronously => one by one
obs$.pipe(observeOn(queueScheduler, delay))
    .subscribe(v => console.log('1 observable queue', v));

// virtual time scheduler

// test scheduler

obs$.subscribe(v => console.log('2 observable default', v));
