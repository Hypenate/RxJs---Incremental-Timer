import { of, interval } from 'rxjs';
import { concatMap, delay, take } from 'rxjs/operators';

function calculateDelay(iteration: number, initialInterval: number): number {
  return iteration * initialInterval + 1000;
}

const spread$ = interval(2000).pipe(
  concatMap((value, index) =>
    of(value).pipe(delay(calculateDelay(index, 2000)))
  ),
  take(5) // To finizalize it
);

spread$.subscribe({
  next(tick) {
    console.log(tick);
  },
  complete() {
    console.log('done');
  },
});
