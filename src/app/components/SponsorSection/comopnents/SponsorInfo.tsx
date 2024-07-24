import { map } from 'lodash-es';
import { FC } from 'react';
import { styled } from '@styled-system/jsx';
import { FadeIn } from '~/shared/components';

import googlecloudImage from './assets/googlecloud.png';
import soomgoImage from './assets/soomgo.png';
import wooritechImage from './assets/wooritech.png';
import wyyyesImage from './assets/wyyyes.png';
import imwebImage from './assets/imweb.png';
import carrotImage from './assets/carrot.png';
import tossImage from './assets/toss.png';
import stibeeImage from './assets/stibee.png';
import fLabImage from './assets/F-Lab.png';

type Grade = 'Master' | 'Diamond' | 'Platiunum' | 'Rookie';
type SponsorData = {
  imageSrc: string;
  href: string;
};

const googlecloud: SponsorData = {
  imageSrc: googlecloudImage.src,
  href: 'https://cloud.google.com/',
};
const soomgo: SponsorData = {
  imageSrc: soomgoImage.src,
  href: 'https://www.soomgo.com/',
};
const wooritech: SponsorData = {
  imageSrc: wooritechImage.src,
  href: 'https://wooritech.com/',
};
const wyyyes: SponsorData = {
  imageSrc: wyyyesImage.src,
  href: 'https://wyyyes.com/',
};
const imweb: SponsorData = {
  imageSrc: imwebImage.src,
  href: 'https://imweb.me/',
};
const carrot: SponsorData = {
  imageSrc: carrotImage.src,
  href: 'https://www.carrotins.com/',
};
const toss: SponsorData = {
  imageSrc: tossImage.src,
  href: 'https://toss.im/',
};
const stibee: SponsorData = {
  imageSrc: stibeeImage.src,
  href: 'https://stibee.com/',
};
const fLab: SponsorData = {
  imageSrc: fLabImage.src,
  href: 'https://f-lab.kr/',
};

const masterList = [googlecloud];
const diamondList = [soomgo, wooritech];
const platinumList = [wyyyes, imweb, carrot, toss];
const rookieList = [stibee, fLab];
const sponsorListLookup: Record<Grade, SponsorData[]> = {
  Master: masterList,
  Diamond: diamondList,
  Platiunum: platinumList,
  Rookie: rookieList,
};

interface Props {
  grade: Grade;
}

const SponsorInfo: FC<Props> = ({ grade }) => {
  const list = sponsorListLookup[grade];
  return (
    <Container distance={30}>
      <Grade>{grade}</Grade>
      <List>
        {map(list, ({ imageSrc, href }) => (
          <li key={href}>
            <Link href={href} target="_blank">
              <SponsorImage grade={grade} src={imageSrc} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};

const Container = styled(FadeIn, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: {
      base: 'initial',
    },
    minHeight: {
      base: '144px',
      xl: '230px',
    },
    padding: {
      base: '20px 25px 30px 25px',
      xl: '30px 25px 28px 25px',
    },
    borderRadius: {
      base: '10px',
      xl: '20px',
    },
    background: 'rgba(78, 77, 96, 0.2)',
  },
});

const Grade = styled('h2', {
  base: {
    fontSize: {
      base: '16px',
      xl: '18px',
    },
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.3)',
    lineHeight: '1.4',
  },
});

const List = styled('ul', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: {
      base: '10px',
      xl: '20px',
    },
    marginTop: {
      base: '20px',
      xl: '33px',
    },
  },
});

const Link = styled('a', {
  base: {
    display: 'block',
    cursor: 'pointer',
    borderRadius: {
      base: '10px',
      xl: '15px',
    },
    _hover: {
      backgroundColor: 'rgba(59, 59, 79, 0.3)',
    },
  },
});

const SponsorImage = styled('img', {
  variants: {
    grade: {
      Master: {
        height: {
          base: '52px',
          xl: '114px',
        },
      },
      Diamond: {
        height: {
          base: '64px',
          xl: '100px',
        },
      },
      Platiunum: {
        height: {
          base: '52px',
          xl: '70px',
        },
      },
      Rookie: {
        height: {
          base: '52px',
          xl: '70px',
        },
      },
    },
  },
});

export default SponsorInfo;
