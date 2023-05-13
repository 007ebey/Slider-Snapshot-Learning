// Import stylesheets
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import React from 'react';

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      images: [
        'https://picsum.photos/400/200?random=1',
        'https://picsum.photos/500/200?random=2',
        'https://picsum.photos/400/300?random=3',
        'https://picsum.photos/600/200?random=4',
        'https://picsum.photos/200/200?random=5',
      ],
      isSliding: false,
      transitionDuration: 1000,
      count: 0,
    };
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => {
        prevState.count += 1;
        return prevState;
      });
      this.setState((prevState) => {
        prevState.count += 1;
        return prevState;
      });
      console.log(this.state.count);
      this.slideImage();
    }, 1000);
  }

  slideImage = () => {
    const { currentImage, images } = this.state;
    const nextImage = (currentImage + 1) % images.length;
    this.setState({ currentImage: nextImage, isSliding: true });
    setTimeout(() => {
      this.setState({ isSliding: false });
    }, this.state.transitionDuration);
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { isSliding } = this.state;
    if (isSliding) {
      const node = this.sliderRef.current;
      const currentImage = this.state.currentImage;
      const currentSlide = node.getElementsByTagName('img')[0];
      console.log(currentSlide);
      const { width, height } = currentSlide;
      console.log(width + height);
      return { width, height };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const node = this.sliderRef.current;
      const currentImage = this.state.currentImage;
      const currentSlide = node.getElementsByTagName('img')[0];
      const { width: prevWidth, height: prevHeight } = snapshot;
      const { width: currentWidth, height: currentHeight } =
        currentSlide.getBoundingClientRect();
      if (prevWidth !== currentWidth || prevHeight !== currentHeight) {
        node.style.width = currentWidth + 'px';
        node.style.height = currentHeight + 'px';
      }
    }
  }

  render() {
    const { images, currentImage } = this.state;
    return (
      <div>
        <span>{this.state.count}</span>
        <div ref={this.sliderRef} className="slider">
          <img src={images[currentImage]} alt={`Current Image`} />
        </div>
      </div>
    );
  }
}

export default ImageSlider;

ReactDOM.render(<ImageSlider />, document.getElementById('app'));
