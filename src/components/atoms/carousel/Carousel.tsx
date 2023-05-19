import { CarouselProps } from "./Carousel.types";
import Image from "next/image";
import Link from "next/link";
import { GrNext, GrPrevious } from 'react-icons/gr';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import { CarouselDot, CarouselDotContainer, CarouselImageContainer, CarouselNavButton } from "./carousel.styles";


export const Carousel = ( props : CarouselProps) => {
  const { items } = props;

  return (
    <CarouselProvider 
      naturalSlideWidth={100}
      naturalSlideHeight={25}
      totalSlides={items.length}
      isPlaying= {true}
      infinite = {true}
      interval={3500}
      isIntrinsicHeight={true}
    >
      <Slider>
        {items.map ((item, index) =>(
          <Slide key={item.title} index={index}>
            <Link href={item.link || ""}>
              <CarouselImageContainer>
              <Image 
                src={ item.image || "" }
                width={100}
                height={100}
                sizes="100vw"
                priority={true}
                alt={item.title || "Carousel Image"}
              />
              </CarouselImageContainer>
            </Link>
          </Slide>
        ))}
      </Slider>


      <ButtonBack>          
          <CarouselNavButton>
            <GrPrevious size={'25px'} />
          </CarouselNavButton>
      </ButtonBack>
      <ButtonNext>
        <CarouselNavButton right>
          <GrNext size={'25px'} />
        </CarouselNavButton>
      </ButtonNext>
      


      <CarouselDotContainer>
        {items.map((item, index) =>(
          <Dot slide={index} key={index}><div><CarouselDot /></div></Dot>
          ))}
      </CarouselDotContainer>
    
    </CarouselProvider>
  );
};
