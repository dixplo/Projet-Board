import { helper } from '@ember/component/helper';

export default helper(function pluralize(params) {
  let [count, zero, one, other] = params;
  if (count == 0) {
    return zero;
  } else if (count == 1) {
    return one;
  } else {
    return count + other;
  }
});
