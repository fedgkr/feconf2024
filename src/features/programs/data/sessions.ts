import { Session, SessionType } from '~/features/programs/types';
import { filter } from 'lodash-es';

const sessions: Session[] = [
  {
    type: SessionType.A,
    title: '후원세션',
    speakers: [],
    order: 1,
  },
  {
    type: SessionType.A,
    title: '에어브릿지 SDK팀이 Unit Testable한 코드를 작성하는 방법',
    description:
      '에어브릿지 SDK 팀에서 사용하는 플랫폼 의존적인 API를 Pure하게 감싸고, 이것을 주입하고, Mocking하고, 유닛테스트를 작성하는 방법에 대해서 소개합니다. 이는 코드를 더 이식하기 쉽게 만들어주고, 테스트의 속도를 높여주고, 코드가 자연스럽게 모듈화 되도록 유도합니다.',
    speakers: [
      {
        name: '최수범',
        company: 'AB180',
      },
    ],
    order: 2,
  },
  {
    type: SessionType.A,
    title: '브라우저를 여행하는 힙스터 개발자를 위한 웹 어셈블리 안내서',
    description:
      '웹 어셈블리의 탄생과 역사를 소개하고 브라우저의 플랫폼화로 인한 웹 어셈블리의 필요성을 예시를 언급하며 이야기 합니다.',
    speakers: [
      {
        name: '김강현',
        company: '광주 소프트웨어 마이스터고등학교',
      },
    ],
    order: 3,
  },
  {
    type: SessionType.A,
    title: '쉽고 편리한 E2E 테스트 자동화를 꿈꾸며...',
    description:
      '"서비스 운영에서 TDD만으로는 부족하다"<br/><br/>' +
      '백엔드도 TDD, 프론트엔드도 TDD로 부분 부분 테스트 코드를 통해 문제 없는 코드를 작성하지만, 실제 고객에게 보여지는 화면을 검증하는 것은 E2E 테스트로만 가능한 상황입니다. 지금은 사라진 Explore 시절부터 E2E 테스트를 시도해보며 겪었던 경험과 현재 트렌드에 가장 적합한 방법까지, 테스트를 보다 편리하게 자동화하기 위해 노력했던 경험을 공유합니다.',
    speakers: [
      {
        name: '백부석 (Kianue)',
        company: '스티비',
      },
    ],
    order: 4,
  },
  {
    type: SessionType.A,
    title: 'React Native와 웹이 공존하는 또 하나의 방법',
    description:
      'Type Safe에 대한 이야기를 간략하게 합니다. React Native와 WebView를 활용해 개발을 할 때 마주칠 수 밖에 없는 통신 문제를 Type Safe하고, 흔하지 않게 해결하는 방법을 다룹니다. 또한 라이브러리를 개발하면서 어떻게 DX를 생각하며 개발할 수 있는지 다룹니다.',
    speakers: [
      {
        name: '강선규',
        company: '브랜더진',
      },
    ],
    order: 5,
  },
  {
    type: SessionType.A,
    title:
      '아�니 이 글자 왜 들어간거예요? (부제: 알아두면 가끔 쓸모있는 한글 유니코드 완전 정복)',
    description:
      '맥에서 첨부한 파일들 윈도우에서 파일 깨지는 경험 해본 적 있으신가요?<br/>' +
      'url 에 한글 넣고나면 한글이 아니라 인코딩으로 어떻게 변하는지 궁금한적 있으신가요?<br/>' +
      '레거시 코드를 만져야 해서 euc-kr로 설정된 웹 페이지를 처리한 경험 있으신가요?<br/>' +
      '한글 인코딩, 코드 이 세션으로 완전 정복 해드립니다.',
    speakers: [
      {
        name: '제한재',
        company: '데니어',
      },
    ],
    order: 6,
  },
  {
    type: SessionType.B,
    title: '후원세션',
    speakers: [],
    order: 1,
  },
  {
    type: SessionType.B,
    title: '바퀴 대신 로켓 만들기',
    description:
      '어드민 서비스에 매일 새로운 화면이 추가되고, 여러 개발자들이 각기 다른 방식으로 개발함에 따라 코드의 복잡성이 나날이 증가하는 상황이 남 일 같지 않다면, 기존의 개발 방식을 탈피하고 우리가 효율적이고 지속 가능한 방식으로 일할 수 있도록 도와줄 도구, 즉 우리만의 프레임워크가 필요한 시점일 수 있습니다.<br/>' +
      '토스페이먼츠 팀에서 올해 상반기에 400개가 넘는 레거시 어드민 페이지를 이관하며 프레임워크를 통해 생산성을 유지하고 목표를 달성한 경험을 공유하고자 합니다.',
    speakers: [
      {
        name: '양의현',
        company: '토스페이먼츠',
      },
    ],
    order: 2,
  },
  {
    type: SessionType.B,
    title:
      '10만 글로벌 유저들이 생겨버린 Three.js 사이드 프로젝트 ─ ShaderGradient 개발기 (feat. 프레이머)',
    description: `다들 사이드 프로젝트 하시죠? 저도 해봤습니다..(일주일에 세 시간씩 친구 디자이너와)<br/>
근데 웬걸 반응이.. 심상치 않아서 최근 12만 유저를 찍고 돈도 벌어주는 (1년에 200만 원 정도) 프로젝트가 되어버렸다면 믿으시겠습니까? 어떻게 이런 결과물이 나올 수 있던 것일까요?<br/>
하고 싶은 거 다 해보고 (Three.js, GLSL, ESM, Store First Component Design, URL DB, monorepo, Web Application with Framer), 변화무쌍한 플랫폼에 적응도 해본 1년 반간의 개발 스토리와, 이 프로덕트를 사람들이 좋아해 줄 수 있었던 썰을 풀어보려고 합니다`,
    speakers: [
      {
        name: '지용민',
        company: '하버스쿨',
      },
    ],
    order: 3,
  },
  {
    type: SessionType.B,
    title: '모던 웹 기술로 C++ 기반 렌더링 엔진 테스트 자동화하기',
    description:
      '크로스 플랫폼을 지원하는 벡터 그래픽스 엔진에 대한 품질 검사를 Front-End 기술만으로 검증하도록 파이프라인을 개선한 경험에 대해 이야기합니다.<br/>' +
      'Windows, MacOS, Android, iOS 그리고 Linux에 이르기까지 모든 환경에서의 적합성 테스트를 웹 페이지에서 한 번에 처리하며, 수만건의 테스트를 자동화하였습니다.\n' +
      '모던 FE 기술이 얼마나 효과적으로 크로스 플랫폼 테스팅을 자동화할 수 있었는지, 모든 과정을 공유합니다.',
    speakers: [
      {
        name: '유진의',
        company: 'LottieFiles',
      },
    ],
    order: 4,
  },
  {
    type: SessionType.B,
    title: '메타버스 서비스(ZEP)에서 게임과 WebRTC를 함께 적용하기',
    description: `0. WebRTC, ZEP 소개<br/>
1. WebRTC 솔루션을 교체하며<br/>
2. React로 이동하며<br/>
3. 리팩터링을 해보며<br/>
4. 다양한 문제점과 해결`,
    speakers: [
      {
        name: '박영진',
        company: '네이버 with ZEP',
      },
    ],
    order: 5,
  },
  {
    type: SessionType.B,
    title: '7가지 플랫폼 서버로 프론트엔드 버프 마법 걸기',
    description:
      '프론트엔드를 강화하는 플랫폼 서버 7가지 사례를 공개합니다! 토스코어 프론트엔드 챕터에서 운영하는 다양한 서버들을 통해 폴리필, 이미지 최적화, OpenGraph 등 여러 문제를 해결하고 더 나은 UX/DX를 실현하는 방법을 소개합니다. 현업에서 즉시 활용 가능한 구체적인 사례와 적용 방법을 통해 프론트엔드를 강화하는 비법을 얻어가세요.',
    speakers: [
      {
        name: '정석호',
        company: '비바리퍼블리카',
      },
    ],
    order: 6,
  },
  {
    type: SessionType.Lightning,
    title: 'Group 1 : Motion',
    description:
      '정미량 - 프론트엔드 주도로 커머스 서비스 개발하기: 효율적 도구 활용<br/>' +
      '유승완 - 개발자로서의 성장: 교육 프로그램과 함께한 2년의 여정<br/>' +
      '김민수 - 성장하기 위한 모든 방법을 동원한다<br/>' +
      '박정욱 - 개발자에게 일을 잘한다는 건 뭔가요?',
    speakers: [
      {
        name: '정미량',
      },
      {
        name: '유승완',
      },
      {
        name: '김민수',
      },
      {
        name: '박정욱',
      },
    ],
    order: 1,
  },
  {
    type: SessionType.Lightning,
    title: 'Group 2 : Collaborations',
    description:
      '박태호 - FE의 문화유산답사기 - 레거시 시스템 운영에 대하여<br/>' +
      '배휘동 - AI 시대의 협업 전략: 3자간(AI + 코드 + 인간) 협업을 통한 대용량 JS 파일 리팩토링 경험<br/>' +
      '최지민 - 프론트에서 백엔드로 전향한 후에 비로소 보이는 것들',
    speakers: [
      {
        name: '박태호',
      },
      {
        name: '배휘동',
      },
      {
        name: '최지민',
      },
    ],
    order: 2,
  },
  {
    type: SessionType.Lightning,
    title: 'Group 3 : Effective Engineer',
    description:
      '조성진 - 저는 vim을 쓰는 프론트엔드 개발자입니다.<br/>' +
      '김무훈 - 프린트 레이아웃과 함께 웹 디자인하기 — CSS Paged Media<br/>' +
      '박영진 - 입사한지 3개월 된 신입 개발자가 팀 생산성에 기여한 이야기 (feat. VSCode Extension)<br/>' +
      '이재호 - 잘못된 리액트 훅의 사용을 미리 찾아보자: 리액트 훅의 엄밀한 의미구조 정의하기',
    speakers: [
      {
        name: '조성진',
      },
      {
        name: '김무훈',
      },
      {
        name: '박영진',
      },
      {
        name: '이재호',
      },
    ],
    order: 3,
  },
  {
    type: SessionType.Lightning,
    title: 'Group 4 : Your near',
    description:
      '홍서희 - 내가 어쩌다 리더가 됐지? : 신입 개발자의 우당탕탕 어드민 개발기<br/>' +
      '최관수 - 사내 첫 리액트 주니어 개발자의 생존기<br/>' +
      '강인영 - 디자이너와 일주일마다 햄버거 메뉴 고르기<br/>' +
      '조영록 - 인터렉션을 단계별로 추상화하여 웹 페이지 개편하기',
    speakers: [
      {
        name: '홍서희',
      },
      {
        name: '최관수',
      },
      {
        name: '강인영',
      },
      {
        name: '조영록',
      },
    ],
    order: 4,
  },
  {
    type: SessionType.Lightning,
    title: 'Group 5 : 저는 말이조',
    description:
      '권경민 - 고졸 개발자로 살아남기<br/>' +
      '김승모 - 우리, 같이 성장할래요?(부제: 커뮤니티와 함께 성장하기)<br/>' +
      '임경희 - 사이드프로젝트로 웹 접근성 시작하기<br/>' +
      '한재현 - 개발자라면 한 번쯤 궁금했을지도 모를 프로그래밍 강사 101',
    speakers: [
      {
        name: '권경민',
      },
      {
        name: '김승모',
      },
      {
        name: '임경희',
      },
      {
        name: '한재현',
      },
    ],
    order: 5,
  },
  {
    type: SessionType.Lightning,
    title: 'Group 6 : Explorers',
    description:
      '김관식 - 오픈소스 기여, 어렵지 않아요!<br/>' +
      '박준영 - PVI - 나에게 잘 맞는 아키텍쳐를 찾아서<br/>' +
      '신다혜 - &lt;Tab /&gt;의 반전: 클릭 한 번으로 본 UI/UX와 비즈니스의 충돌<br/>' +
      '김지연 - 3인 애자일 조직에서 프로덕트를 출시하기까지의 경험',
    speakers: [
      {
        name: '김관식',
      },
      {
        name: '박준영',
      },
      {
        name: '신다혜',
      },
      {
        name: '김지연',
      },
    ],
    order: 6,
  },
];

const aSessionList = filter(sessions, { type: SessionType.A });

const bSessionList = filter(sessions, { type: SessionType.B });

const lightningSessionList = filter(sessions, { type: SessionType.Lightning });

export { sessions, aSessionList, bSessionList, lightningSessionList };
