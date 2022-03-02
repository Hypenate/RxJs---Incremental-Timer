import { of, interval } from 'rxjs';
import { concatMap, delay, take } from 'rxjs/operators';

function calculateDelay(iteration, initialInterval) {
  const delay = iteration * initialInterval + 1000;
  console.log('delay: ' + delay);

  return delay;
}

const source = interval(2000);
const spread = source.pipe(
  concatMap((value, index) => {
    return of(value).pipe(delay(calculateDelay(index, 2000)));
  }),
  take(10) // To finizalize it
);

spread.subscribe({
  complete() {
    console.log('done');
  },
});
