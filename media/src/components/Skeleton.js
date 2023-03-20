import classNames from 'classnames';

function Skeleton({ times, className }) {
  const outerClassNames = classNames(
    'relative', //allow to position inner element absolutely 
    'overflow-hidden', //hide inner element if they not overlapping
    'bg-gray-200',
    'rounded', 
    'mb-2.5',
    className
  );
  const innerClassNames = classNames(
    'animate-shimmer', //apply the animation shimmer that was create
    'absolute',
    'inset-0',
    '-translate-x-full',
    //this allow the inner div to move off left hand side of outer div
    'bg-gradient-to-r', //change gradient to the right hand side
    'from-gray-200',
    'via-white',
    'to-gray-200'
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
      <div key={i} className={outerClassNames}>
        <div className={innerClassNames}/>
      </div>
    );
  });

  return boxes;
}

export default Skeleton;