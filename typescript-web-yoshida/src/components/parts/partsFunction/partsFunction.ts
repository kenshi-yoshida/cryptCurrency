export function changeWidth(props: 'full' | 'half' | number | undefined): string {
  if (props === 'full') {
    return '100%';
  } else if (props === 'half') {
    return '50%';
  } else if (props) {
    return `${props}px`;
  }
  return '100px';
}

export function changeButtonBgColor(hover: string | undefined): string {
  if (hover === 'primary') {
    return 'rgba(65, 211, 255 , .5)';
  } else if (hover === 'attention') {
    return 'rgba(255, 238, 0, .5)';
  } else if (hover === 'danger') {
    return 'rgba(236, 20, 20, 0.6)';
  }
  return 'none';
}

export function changeTheadBgColor(bgColor: string | undefined) {
  let backColor = 'white';
  let fontColor = 'black';
  if (bgColor === 'gray') {
    backColor = 'rgb(126, 126, 126)';
    fontColor = 'white';
  } else if (bgColor === 'blue') {
    backColor = 'rgb(60,60,255)';
    fontColor = 'white';
  }
  return { backColor, fontColor };
}
