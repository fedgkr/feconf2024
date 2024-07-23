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
    title: '에어브릿지 SDK팀이 순수한 유닛테스트를 작성하는 방법',
    description:
      '프론트엔드 환경에서는 많은 변화가 요구되기 때문에 유닛테스트의 중요성이 다른 분야에 대해 상대적으로 강조되지 않고 있습니다. 하지만 거대한 프론트엔드 프로젝트가 되어 UI 뿐만아니라 로직에 영역도 많아지는 경우도 있고, 저희처럼 SDK여서 로직만 있는 경우도 있습니다.\n' +
      '하지만 현재는 프론트엔드, Web 영역에 있어서 DOM API와 플랫폼 의존적인 API를 Pure하게 감싸서 ECMAScript가 지원되는 어떠한 환경에서도 동작할 수 있는 Unit Test를 작성하는 방법에 대한 자료가 적고 대부분 JSDOM 등을 활용하거나 Unit Test 자체를 브라우저위에서 동작시키는 등의 자료가 더 많습니다.\n' +
      '그래서 에어브릿지 SDK 팀에서 사용하는 플랫폼 의존적인 API를 Pure하게 감싸고, 이것을 주입하고, Mocking 하고, Pure한 유닛테스트를 작성하는 방법을 공유드리고자 합니다.\n' +
      '(예시로는 이것을 목적하고 작성하느 글은 아니지만 아래 글에서 satisfies 키워드를 사용하는 예시를 제시하기 위해 작성하는 internationalize 함수의 createDependency 부분에서 의존성 주입에 대한 메인 아이디어를 확인해보실 수 있습니다.)',
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
      '웹 어셈블리의 탄생과 역사를 소개하고 브라우저의 플랫폼화로 인한 웹 어셈블리의 필요성을 예시를 언급하며 이야기 합니다. ',
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
    title: 'e2e 테스트 자동화',
    description:
      '간단하게는 오랜 개발 기간동안 세대별로 E2E 테스트를 완성하기 위한 노력과 E2E 테스트를 왜 계속 해보려고 시도했는지에 대한 이야기입니다.<br/>' +
      'https://www.notion.so/e2e-4bb94f7db77a4f20bdc3d93e4860288a?pvs=21',
    speakers: [
      {
        name: '백부석',
        company: '스티비',
      },
    ],
    order: 4,
  },
  {
    type: SessionType.A,
    title: 'React Native와 웹이 공존하는 또 하나의 방법',
    description:
      '1. 타입 안전성(Type Safety)의 중요성<br/><br/>' +
      '타입스크립트를 사용함으로써 개발 단계에서 데이터 타입의 불일치로 인한 오류를 방지할 수 있습니다. 이는 명백해 보이지만, 실제 개발 과정에서 예상치 못한 타입 불일치가 발생할 수 있습니다. 예를 들어, 타입 상 null이 아니어야 하는 필드가 실제로는 null 값을 가질 때, 코드는 data?.age와 같이 복잡해질 수 있습니다. 이런 상황이 반복되면, 타입스크립트 시스템에 대한 신뢰가 떨어지게 됩니다. 타입 불일치는 대개 외부 데이터의 타입을 명확히 지정하지 못할 때 발생합니다. 타입에서 오류가 나면 실제로도 오류가 나야합니다.\n' +
      '<br/>' +
      '2. React Native와 웹뷰 간의 통신 문제 해결<br/><br/>' +
      'React Native에서 웹뷰를 개발하며, 웹뷰와 네이티브 간의 통신 인터페이스 구성이 필요합니다. 예를 들어, 웹뷰에서는 인앱 브라우저를 직접 띄울 수 없으며, 이를 위해 네이티브와 통신해야 합니다. 대부분의 경우, 단방향 통신만 구현되며, 이는 성공 여부를 확인하거나 적절한 실패 처리를 할 수 없게 만듭니다. 이 문제의 해결책으로 tRPC에서 영감을 얻었습니다. tRPC는 코드 작성 후 타입을 이용하여 프론트엔드에서 자동으로 호출 코드를 생성합니다. 이를 통해 서버를 React Native로, 클라이언트를 웹뷰로 설정함으로써 네이티브에서 작성을 한번하면 웹뷰에서도 바로 사용이 가능한 seamless한 통신이 가능해집니다. 또한, shared state 개념을 도입하여 React Native에서 선언된 상태를 웹뷰에서도 reactive하게 공유할 수 있게 함으로써, 인증 정보나 사용자 정보 등을 웹에서도 사용할 수 있게 했습니다. 이는 기존 방식에서 벗어나 React Native와 웹뷰의 관계를 새롭게 정립하는 방법입니다.\n' +
      '<br/>' +
      '3. 사용법 중심 개발(Usage-Driven Development)<br/><br/>' +
      '우수한 개발 경험(Developer Experience, DX)을 제공하는 라이브러리가 이미 많이 있습니다. 완전히 새로운 개념을 도입하면 학습 곡선이 가파르게 됩니다. 이를 완화하는 방법 중 하나는 이미 잘 추상화되고 우수한 DX를 제공하는 라이브러리를 참고하는 것입니다. tRPC에서 바로 실행 가능한 API를 생성하는 방식을 참고하여, 사용법을 기반으로 한 개발을 추구했습니다. 이는 개발자가 한 번의 작성으로 바로 사용할 수 있는 구조를 고민할 수 있게 합니다. 또한, shared state는 전역 상태 관리 개념으로 접근하며, 이에 대한 사용법은 zustand를 참고했습니다. zustand에 익숙한 사용자라면 쉽게 적응할 수 있습니다. 최고의 DX는 결국 라이브러리의 사용법에서 비롯된다고 생각합니다.',
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
    title: '아�니 이 글자는 왜 들어가는거에요?',
    description:
      '현대 웹 서비스에서 대부분 utf-8을 사용하면서 인코딩과 관련된 문제들이 거의 보기 어려워지고 있습니다. 그러나 간혹 유니코드를 사용하면서 발생할 수 있는 문제와 레거시에서 가끔 보이는 euc-kr 표현들을 이해한다면 프론트엔드 커리어에서 5년에 한 번 정도 만날 수 있는 이슈를 해결하는데 이번 발표가 여러분이 그 순간에 닥쳤을 때 실마리를 제공할 수 있는 계기가 되었으면 합니다.',
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
      '만약 여러분이 6개월 동안 400개가 넘는 레거시 어드민 화면을 리빌딩 해야하는 상황에 놓인다면..?<br/><br/>' +
      '빡빡한 일정 속에서 페이스를 잃지 않고 개발하기 위해 시도했던 우리 팀의 도전들을 공유하고자 합니다.<br/>' +
      '- 개발 생산성을 극대화하기 위해 우리만의 프레임워크 만들기<br/>' +
      '- 디자인 효율성을 끌어올리고자 디자이너들과 논의 끝에 탄생한 Product system과 제품 패턴들<br/>' +
      '- 서버 api와의 빠른 통합을 위한 code generator 제작까지<br/>' +
      '<br/>' +
      '프론트엔드 엔지니어들이 겪는 다양한 비효율을 극복하고, 팀의 모든 프론트 개발자들이 동일한 퀄리티의 결과물을 빠르게 만들어낼 수 있었습니다.',
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
      '12만 글로벌 유저들이 생겨버린 Three.js 사이드 프로젝트 ─ ShaderGradient 개발기',
    description:
      '올해 초에 런칭하여 10만명의 전세계 유저들이 생겨버린.. 사이드 프로젝트를 공유 해보고 싶습니다' +
      'Three.js / glsl 도 거의 처음이었고, 프레이머라는 플랫폼이 변화가 심한 특성상 다양한 개발 방식을 도입해 보는데 우여곡절이 많았었습니다 (테스터의 ip 기반 ESM 모듈등..).' +
      '그치만 런칭 후에 운이 좋게도 전세계 많은 디자이너-개발자 분들이 좋아해주시는 플러그인 / 패키지가 되었습니다.' +
      '이 경험을 공유해서 관련 개발 지식 & 사이드 프로젝트에 관심이 많은 분들에게 도움이 되면 좋겠습니다!<br/>' +
      '감사합니다.',
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
    title: '모던 웹 기술로 C++ 그래픽스 엔진 테스트 자동화하기',
    description:
      '크로스 플랫폼을 지원하는 벡터 그래픽스 엔진에 대한 품질 검사를 Front-End 기술만으로 검증하도록 파이프라인을 개선한 경험에 대해 이야기합니다.\n' +
      'Windows, MacOS, Android, iOS 그리고 Linux에 이르기까지 모든 환경에서의 적합성 테스트를 웹 페이지에서 한 번에 처리하며, 수만건에 달하는 테스트를 자동화하였습니다.\n' +
      '어떻게 모던 FE 기술이 크로스 플랫폼의 복잡한 문제를 해결할 수 있었는지, 모든 과정을 공유합니다.',
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
    title: '메타버스 서비스에서 React, WebRTC, Canvas 다루기',
    description:
      '1. WebRTC, ZEP 간략 소개<br/>' +
      '2. WebRTC 적용 과정<br/>' +
      '- 미디어의 상태와 게임의 상태 동기화<br/>' +
      '- 성능을 생각하며 개발하기<br/>' +
      '- RxJS로의 리팩터링 시도 (시간이 된다면)<br/>' +
      '3. 적용과정에서의 트러블슈팅<br/>' +
      '- iOS에서의 문제점(성능)<br/>' +
      '- React로 인한 문제점(동기화)<br/>' +
      '4. Q&A',
    speakers: [
      {
        name: '박영진',
        company: '네이버',
      },
    ],
    order: 5,
  },
  {
    type: SessionType.B,
    title: '7가지 플랫폼 서버로 프론트엔드 버프 마법 걸기',
    description:
      '현대 웹 서비스에서 대부분 utf-8을 사용하면서 인코딩과 관련된 문제들이 거의 보기 어려워지고 있습니다. 그러나 간혹 유니코드를 사용하면서 발생할 수 있는 문제와 레거시에서 가끔 보이는 euc-kr 표현들을 이해한다면 프론트엔드 커리어에서 5년에 한 번 정도 만날 수 있는 이슈를 해결하는데 이번 발표가 여러분이 그 순간에 닥쳤을 때 실마리를 제공할 수 있는 계기가 되었으면 합니다.',
    speakers: [
      {
        name: '정석호',
        company: '토스',
      },
    ],
    order: 6,
  },
  {
    type: SessionType.Lightning,
    title: 'Group 1 : Motion',
    description:
      '정미량 - 초기 스타트업에서 프론트엔드 개발자로서 첫 세팅, 내가 선택한 것들 그리고 후기<br/>' +
      '유승완 - 개발자로서 성장: 교육 프로그램과 함께한 2년의 여정<br/>' +
      '박정우 - 개발자에게 일을 잘한다는 건 뭔가요?',
    speakers: [
      {
        name: '정미량',
      },
      {
        name: '유승완',
      },
      {
        name: '박정욱',
      },
    ],
    order: 1,
  },
  {
    type: SessionType.Lightning,
    title: 'Group 2 : 콜라보',
    description:
      '박태호 - FE의 문화유산답사기 - 레거시 시스템 운영에 대하여<br/>' +
      '배휘동 - AI 시대의 협업 전략: 3자간(AI + 코드 + 인간) 협업을 통한 대용량 JS 파일 리팩토링 경험<br/>' +
      '최지민 - fe to be (서버로 전향한 후에 비로소 보이는 것들)',
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
    title: 'Group 3 : 이펙티브 엔지니어',
    description:
      '조성진 - 당신은 어떤 IDE로 개발하나요? (feat. Neovim)<br/>' +
      '김무훈 - A4 레이아웃 프린트를 지원하는 웹 이력서 조판하기<br/>' +
      '박영진 - 복붙은 그만! VSCode 확장으로 같은 형식의 파일 자동 생성하기<br/>' +
      '이재호 - 잘못된 리액트 훅의 사용을 자동으로 미리 찾아보자!',
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
      "홍서희 - 신입 개발자의 프로젝트 리딩, what's next?<br/>" +
      '김민수 - 성장하기 위한 모든 방법을 동원한다<br/>' +
      '최관수 - 사내 첫 리액트 주니어 개발자의 생존기<br/>' +
      '강인영 - 디자이너와 개발자, 서로의 세계를 만나다 (feat. 초기 스타트업에서 주니어 개발자의 첫 디자인 시스템 구축기)<br/>' +
      '조영록 - 인터렉션을 단계별로 추상화하여 웹 페이지 개편하기',
    speakers: [
      {
        name: '홍서희',
      },
      {
        name: '김민수',
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
      '한재현 - 프론트엔드 개발자에서 프로그래밍 강사로의 뜻밖의 여정 (추후 수정 예정)',
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
      '김관식 - 오픈소스 기여, 주니어 개발자도 할 수 있어요!<br/>' +
      '박준영 - PVI - 나에게 잘 맞는 아키텍쳐를 찾아서<br/>' +
      '신다혜 - UX 개선이 비즈니스 목표와 충돌할 때, A/B 테스트를 통해 얻은 교훈<br/>' +
      '김지연 - 3인 애자일 조직에서의 프런트엔드 개발자의 역할',
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
