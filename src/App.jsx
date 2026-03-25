import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Timer, RefreshCw, ChevronRight, Home, CheckCircle2, XCircle, BarChart3 } from 'lucide-react';

// --- DATA: Questions (Correct answer at index 0, shuffled later) ---
const QUESTIONS_DATA = {
    history: [
        { q: "조선을 건국한 태조의 이름은?", a: ["이성계", "이방원", "이도", "이산"], c: 0 },
        { q: "한글(훈민정음)을 창제한 왕은?", a: ["세종대왕", "정조", "태종", "성종"], c: 0 },
        { q: "임진왜란 때 한산도 대첩을 승리로 이끈 장군은?", a: ["이순신", "권율", "김시민", "곽재우"], c: 0 },
        { q: "3.1 운동의 상징적인 인물로 서대문 형무소에서 순국한 열사는?", a: ["유관순", "안중근", "윤봉길", "김구"], c: 0 },
        { q: "발해를 건국한 인물은?", a: ["대조영", "온조", "박혁거세", "궁예"], c: 0 },
        { q: "고구려의 전성기를 이끈 '정복 군주'는?", a: ["광개토대왕", "장수왕", "동명성왕", "소수림왕"], c: 0 },
        { q: "신라의 삼국 통일에 결정적인 기여를 한 화랑 출신 장군은?", a: ["김유신", "계백", "을지문덕", "연개소문"], c: 0 },
        { q: "고려를 세운 태조의 이름은?", a: ["왕건", "이색", "최영", "정몽주"], c: 0 },
        { q: "독립협회를 창립하고 독립문을 세운 인물은?", a: ["서재필", "이승만", "안창호", "신채호"], c: 0 },
        { q: "수원 화성을 설계하고 지은 조선의 왕은?", a: ["정조", "영조", "숙종", "순조"], c: 0 },
        { q: "살수대첩에서 수나라 군대를 격파한 고구려 장군은?", a: ["을지문덕", "양만춘", "강감찬", "윤관"], c: 0 },
        { q: "귀주대첩에서 거란군을 물리친 고려의 장군은?", a: ["강감찬", "서희", "최무선", "이성계"], c: 0 },
        { q: "조선 시대 최고의 지리학자로 '대동여지도'를 제작한 인물은?", a: ["김정호", "장영실", "허준", "박지원"], c: 0 },
        { q: "동의보감을 집필한 조선 시대 명의는?", a: ["허준", "이제마", "정약용", "신사임당"], c: 0 },
        { q: "해동성국이라 불리던 나라는?", a: ["발해", "고려", "가야", "옥저"], c: 0 },
        { q: "백제의 마지막 왕으로 삼천궁녀 전설과 관련된 왕은?", a: ["의자왕", "근초고왕", "무령왕", "성왕"], c: 0 },
        { q: "고구려를 세운 주몽의 호칭은?", a: ["동명성왕", "유리왕", "고국양왕", "안장왕"], c: 0 },
        { q: "병자호란 때 남한산성에서 항전한 왕은?", a: ["인조", "선조", "효종", "광해군"], c: 0 },
        { q: "우리나라 최초의 국가 명칭은?", a: ["고조선", "부여", "삼한", "진국"], c: 0 },
        { q: "단군왕검이 세운 고조선의 건국 이념은?", a: ["홍익인간", "경천애인", "화랑도", "유교정치"], c: 0 },
        { q: "신라의 수도는 어디인가요?", a: ["경주", "부여", "공주", "개성"], c: 0 },
        { q: "고려의 수도는 어디인가요?", a: ["개성", "한양", "평양", "강화도"], c: 0 },
        { q: "조선의 기본 법전 이름은?", a: ["경국대전", "속대전", "대전통편", "육전조례"], c: 0 },
        { q: "임진왜란 당시 거북선을 처음 실전에 투입한 해전은?", a: ["사천 해전", "노량 해전", "명량 해전", "한산도 해전"], c: 0 },
        { q: "안중근 의사가 이토 히로부미를 저격한 장소는?", a: ["하얼빈역", "상하이", "도쿄", "블라디보스토크"], c: 0 },
        { q: "윤봉길 의사가 폭탄을 던진 상하이의 공원은?", a: ["홍커우 공원", "천안문 광장", "난징 공원", "상하이 공원"], c: 0 },
        { q: "대한민국 임시정부의 초대 대통령은?", a: ["이승만", "김구", "안창호", "이동휘"], c: 0 },
        { q: "실학을 집성하고 '목민심서'를 저술한 학자는?", a: ["정약용", "이황", "이이", "송시열"], c: 0 },
        { q: "화포를 발명하여 진포대첩에서 왜구를 물리친 인물은?", a: ["최무선", "장영실", "남이", "임경업"], c: 0 },
        { q: "신라 말기 완도에 청해진을 설치한 인물은?", a: ["장보고", "견훤", "박서", "김춘추"], c: 0 },
        { q: "고구려의 신분제도로 부족한 식량을 빌려주던 제도는?", a: ["진대법", "호포제", "균역법", "직전법"], c: 0 },
        { q: "원효대사가 창시한 불교 종파와 관련된 사상은?", a: ["화쟁사상", "교관겸수", "돈오점수", "정혜쌍수"], c: 0 },
        { q: "조선 후기 서민들의 애환을 담은 그림을 무엇이라 하나요?", a: ["풍속화", "수묵화", "산수화", "정물화"], c: 0 },
        { q: "1919년 일어난 민족 최대의 항일 독립운동은?", a: ["3.1 운동", "6.10 만세운동", "광주 학생 운동", "갑신정변"], c: 0 },
        { q: "조선 시대 왕의 비서실 역할을 하던 기구는?", a: ["승정원", "의금부", "사헌부", "집현전"], c: 0 },
        { q: "고려 시대 외교술로 강동 6주를 획득한 인물은?", a: ["서희", "이지란", "최영", "윤관"], c: 0 },
        { q: "갑신정변을 주도한 급진 개화파의 인물은?", a: ["김옥균", "박영효", "서광범", "홍영식"], c: 0 },
        { q: "동학 농민 운동을 이끈 '녹두장군'은?", a: ["전봉준", "손병희", "최제우", "최시형"], c: 0 },
        { q: "독립군 최대의 승리 중 하나인 청산리 대첩의 영웅은?", a: ["김좌진", "홍범도", "지청천", "이범석"], c: 0 },
        { q: "봉오동 전투를 승리로 이끈 장군은?", a: ["홍범도", "김좌진", "안창호", "신채호"], c: 0 },
        { q: "대한제국을 선포하고 스스로 황제가 된 인물은?", a: ["고종", "순종", "대원군", "명성황후"], c: 0 },
        { q: "6.25 전쟁 당시 인천상륙작전을 지휘한 장군은?", a: ["맥아더", "워커", "리지웨이", "아이젠하워"], c: 0 },
        { q: "조선 전기에 제작된 세계 지도 '혼일강리역대국도지도'의 특징은?", a: ["아시아 중심", "유럽 중심", "아메리카 포함", "남극 포함"], c: 0 },
        { q: "제주도 4.3 사건의 배경이 된 시기는?", a: ["해방 직후", "6.25 전쟁중", "일제강점기", "조선후기"], c: 0 },
        { q: "우리나라 최초의 서양식 병원은?", a: ["광혜원", "세브란스", "보구여관", "대동병원"], c: 0 },
        { q: "박정희 정부 시절 경제 개발의 상징인 도로 이름은?", a: ["경부고속도로", "호남고속도로", "중부고속도로", "서해안고속도로"], c: 0 },
        { q: "1987년 일어난 민주화 운동의 명칭은?", a: ["6월 민주 항쟁", "5.18 민주화 운동", "4.19 혁명", "부마항쟁"], c: 0 },
        { q: "금속 활자로 인쇄된 세계에서 가장 오래된 책은?", a: ["직지심체요절", "무구정광대다라니경", "팔만대장경", "삼국유사"], c: 0 },
        { q: "고려시대 강화도에서 몽골의 침입을 막기 위해 만든 불경은?", a: ["팔만대장경", "초조대장경", "재조대장경", "금강경"], c: 0 },
        { q: "조선 시대 여성 교육의 지침서 '내훈'을 쓴 인물은?", a: ["소혜왕후", "허난설헌", "신사임당", "황진이"], c: 0 },
    ],
    kpop: [
        { q: "H.O.T.의 대표곡으로 털장갑과 모자가 유행했던 곡은?", a: ["캔디", "전사의 후예", "행복", "빛"], c: 0 },
        { q: "S.E.S.의 데뷔곡 'I'm Your ___'?", a: ["Girl", "Baby", "Love", "Lady"], c: 0 },
        { q: "핑클(Fin.K.L)의 멤버가 아닌 사람은?", a: ["유진", "이효리", "성유리", "옥주현"], c: 0 },
        { q: "god의 히트곡 중 '어머님은 짜장면이 싫다고 하셨어' 가사가 나오는 곡은?", a: ["어머님께", "거짓말", "촛불하나", "길"], c: 0 },
        { q: "원더걸스의 'Tell Me'에서 소희가 부른 킬링 파트 가사는?", a: ["어머나", "미안해", "왜이래", "사랑해"], c: 0 },
        { q: "빅뱅의 히트곡 '거짓말'에서 도입부 나레이션을 한 멤버는?", a: ["G-DRAGON", "태양", "탑", "대성"], c: 0 },
        { q: "소녀시대의 'Gee' 무대 의상으로 가장 유명했던 것은?", a: ["컬러 스키니진", "멜빵 바지", "테니스 스커트", "치마 레깅스"], c: 0 },
        { q: "샤이니의 데뷔곡 '누난 너무 ___'?", a: ["예뻐", "착해", "멋져", "귀여워"], c: 0 },
        { q: "카라의 '엉덩이춤'으로 유명한 곡 제목은?", a: ["Mister", "Honey", "Lupin", "Step"], c: 0 },
        { q: "2PM의 대표 수식어는?", a: ["짐승돌", "국민돌", "남친돌", "연기돌"], c: 0 },
        { q: "싸이(PSY)의 세계적인 히트곡은?", a: ["강남스타일", "챔피언", "젠틀맨", "나팔바지"], c: 0 },
        { q: "아이유의 3단 고음으로 유명한 곡 제목은?", a: ["좋은 날", "잔소리", "너랑 나", "분홍신"], c: 0 },
        { q: "EXID를 역주행시킨 하니의 직캠곡은?", a: ["위아래", "아예", "덜덜덜", "핫핑크"], c: 0 },
        { q: "브라운 아이드 걸스의 '시건방춤'이 나오는 곡은?", a: ["Abracadabra", "Sign", "Sixth Sense", "L.O.V.E"], c: 0 },
        { q: "슈퍼주니어의 글로벌 히트곡 '___ Sorry'?", a: ["Sorry", "Crazy", "Really", "Happy"], c: 0 },
        { q: "이효리의 솔로 데뷔곡으로 2003년을 휩쓴 곡은?", a: ["10 Minutes", "Get Ya", "U-Go-Girl", "Bad Girls"], c: 0 },
        { q: "비(Rain)의 히트곡으로 '쓰읍 하' 소리가 인상적인 곡은?", a: ["It's Raining", "태양을 피하는 방법", "Rainism", "I Do"], c: 0 },
        { q: "동방신기의 5인조 시절 마지막 곡은?", a: ["주문-MIROTIC", "Rising Sun", "Hug", "Tonight"], c: 0 },
        { q: "2NE1의 데뷔곡은?", a: ["Fire", "I Don't Care", "내가 제일 잘 나가", "Go Away"], c: 0 },
        { q: "젝스키스의 재결합 후 가장 큰 사랑을 받은 과거 히트곡은?", a: ["커플", "학원별곡", "기사도", "로드파이터"], c: 0 },
        { q: "터보(Turbo)의 여름 히트곡 '___ 트위스트'?", a: ["트위스트 킹", "검은 고양이", "회상", "Goodbye Yesterday"], c: 0 },
        { q: "룰라의 대표곡 '날개 잃은 ___'?", a: ["천사", "비행기", "나비", "새"], c: 0 },
        { q: "쿨(Cool)의 대표적인 여름 노래는?", a: ["해변의 여인", "애상", "슬퍼지려 하기 전에", "점보 맘보"], c: 0 },
        { q: "신화의 시그니처 의자 댄스가 나오는 곡은?", a: ["Wild Eyes", "T.O.P", "Brand New", "Only One"], c: 0 },
        { q: "엄정화의 대표곡 '말해줘'를 피처링한 그룹은?", a: ["지누션", "원타임", "CB Mass", "DJ DOC"], c: 0 },
        { q: "조성모의 '가시나무' 뮤직비디오 배경으로 유명한 나라는?", a: ["일본", "중국", "러시아", "캐나다"], c: 0 },
        { q: "쥬얼리의 박정아, 이지현, 조민아, 서인영 시절 최대 히트곡은?", a: ["Superstar", "One More Time", "니가 참 좋아", "Again"], c: 0 },
        { q: "코요태의 메인 보컬로 시원한 가창력을 뽐내는 멤버는?", a: ["신지", "김종민", "빽가", "차승민"], c: 0 },
        { q: "소찬휘의 노래방 끝판왕 고음곡은?", a: ["Tears", "Wise Choice", "보낼 수밖에 없는 난", "헤어지는 기회"], c: 0 },
        { q: "자우림의 리드 보컬 이름은?", a: ["김윤아", "백지영", "거미", "박정현"], c: 0 },
        { q: "티아라의 고양이 댄스가 나오는 곡은?", a: ["Bo Peep Bo Peep", "Roly-Poly", "Lovey-Dovey", "너 때문에 미쳐"], c: 0 },
        { q: "걸스데이의 기대해 뮤직비디오에서 화제가 된 춤은?", a: ["멜빵춤", "학다리춤", "가다랑어춤", "고양이춤"], c: 0 },
        { q: "에이핑크의 데뷔 초 청순 컨셉 곡은?", a: ["NoNoNo", "LUV", "Mr. Chu", "Molly Luv"], c: 0 },
        { q: "인피니트의 전설적인 '전갈춤'이 나오는 곡은?", a: ["BＴD", "내꺼하자", "추격자", "파라다이스"], c: 0 },
        { q: "비스트(BEAST)의 대표곡 'Shock'의 장르는?", a: ["락트로닉", "힙합", "R&B", "발라드"], c: 0 },
        { q: "포미닛의 현아가 솔로로 데뷔하며 낸 첫 싱글은?", a: ["Change", "Bubble Pop", "Ice Cream", "Red"], c: 0 },
        { q: "미쓰에이(miss A)의 데뷔곡 'Bad Girl ___'?", a: ["Good Girl", "Nice Girl", "Cool Girl", "Sexy Girl"], c: 0 },
        { q: "백지영의 대표적인 댄스곡 '내 귀에 ___'?", a: ["캔디", "보석", "다이아", "초콜릿"], c: 0 },
        { q: "씨스타의 대표적인 여름 히트곡 '___ Boy'?", a: ["Loving", "Summer", "Lonely", "Touch"], c: 0 },
        { q: "아이유의 '좋은 날' 뮤직비디오에 출연한 남자 연예인은?", a: ["정재형", "이현우", "장기하", "박보검"], c: 0 },
        { q: "보아(BoA)의 일본 진출 대성공곡 'LISTEN TO MY ___'?", a: ["HEART", "SOUL", "MIND", "LIFE"], c: 0 },
        { q: "세븐(SEVEN)의 데뷔곡이자 바퀴 달린 신발을 유행시킨 곡은?", a: ["와줘", "열정", "라라라", "내가 노래를 못해도"], c: 0 },
        { q: "박진영의 히트곡 '그녀는 ___'?", a: ["예뻤다", "착했다", "섹시했다", "도도했다"], c: 0 },
        { q: "김건모의 '잘못된 만남'이 수록된 앨범 판매량은?", a: ["약 280만장", "약 100만장", "약 50만장", "약 400만장"], c: 0 },
        { q: "서태지와 아이들의 데뷔곡은?", a: ["난 알아요", "하여가", "교실 이데아", "컴백홈"], c: 0 },
        { q: "성시경의 대표적인 고백 노래 '내게 오는 ___'?", a: ["길", "사랑", "마음", "밤"], c: 0 },
        { q: "김종국의 3사 가요 대상을 싹쓸이하게 만든 곡은?", a: ["제자리 걸음", "한 남자", "사랑스러워", "별, 바람, 햇살 그리고 사랑"], c: 0 },
        { q: "임창정의 댄스 히트곡 '늑대와 함께 ___'?", a: ["춤을", "노래를", "사랑을", "파티를"], c: 0 },
        { q: "버즈(Buzz) 민경훈의 노래방 애창곡 1위는?", a: ["가시", "겁쟁이", "나에게로 떠나는 여행", "남자를 몰라"], c: 0 },
        { q: "다비치의 데뷔곡은?", a: ["미워도 사랑하니까", "8282", "안녕이라고 말하지마", "시간아 멈춰라"], c: 0 },
    ],
    english: [
        { q: "'Break a leg'의 뜻은?", a: ["행운을 빌어", "다리가 부러져", "빨리 달려", "열심히 해"], c: 0 },
        { q: "'Under the weather'의 뜻은?", a: ["몸이 좀 안 좋아", "비가 오네", "날씨가 좋아", "우산 챙겨"], c: 0 },
        { q: "'Piece of cake'의 뜻은?", a: ["식은 죽 먹기", "케이크 한 조각", "너무 달아", "디저트 먹자"], c: 0 },
        { q: "'Hit the books'의 뜻은?", a: ["열심히 공부하다", "책을 던지다", "도서관에 가다", "책을 사다"], c: 0 },
        { q: "'Call it a day'의 뜻은?", a: ["그만 끝내자", "오늘을 불러", "전화해", "하루를 시작해"], c: 0 },
        { q: "'Bite the bullet'의 뜻은?", a: ["어려움을 참고 견디다", "총알을 씹다", "화가 나다", "서두르다"], c: 0 },
        { q: "'Barking up the wrong tree'의 뜻은?", a: ["번지수를 잘못 찾다", "나무를 흔들다", "개처럼 짖다", "길을 잃다"], c: 0 },
        { q: "'Once in a blue moon'의 뜻은?", a: ["아주 드물게", "보름달이 뜰 때", "자주", "매일 밤"], c: 0 },
        { q: "'The apple of my eye'의 뜻은?", a: ["아주 소중한 사람", "눈에 든 사과", "시력이 좋다", "빨간 사과"], c: 0 },
        { q: "'Let the cat out of the bag'의 뜻은?", a: ["비밀을 누설하다", "고양이를 풀어주다", "가방을 열다", "실수하다"], c: 0 },
        { q: "'Break the ice'의 뜻은?", a: ["어색한 분위기를 깨다", "얼음을 깨뜨리다", "화를 풀다", "시작하다"], c: 0 },
        { q: "'Better late than never'의 뜻은?", a: ["늦더라도 안 하는 것보다 낫다", "절대 늦지 마라", "일찍 오는 게 좋다", "시간은 금이다"], c: 0 },
        { q: "'Cost an arm and a leg'의 뜻은?", a: ["매우 비싸다", "팔다리가 아프다", "돈이 없다", "절약하다"], c: 0 },
        { q: "'Cross that bridge when you come to it'의 뜻은?", a: ["미리 걱정하지 마라", "다리를 건너라", "조심해라", "계획을 세워라"], c: 0 },
        { q: "'Cutting corners'의 뜻은?", a: ["절차를 생략하다(날림으로 하다)", "모서리를 자르다", "길을 잃다", "아끼다"], c: 0 },
        { q: "'Easy does it'의 뜻은?", a: ["조심해라 / 살살 해라", "정말 쉽다", "그만 해라", "빨리 끝내라"], c: 0 },
        { q: "'Get out of hand'의 뜻은?", a: ["통제 불능이 되다", "손을 놓다", "밖으로 나가다", "손을 씻다"], c: 0 },
        { q: "'Get your act together'의 뜻은?", a: ["정신 차리고 잘 해라", "연극을 준비해라", "함께 모여라", "옷을 차려입어라"], c: 0 },
        { q: "'Give someone the benefit of the doubt'의 뜻은?", a: ["속는 셈 치고 믿어주다", "의심을 하다", "혜택을 주다", "비난하다"], c: 0 },
        { q: "'Go back to the drawing board'의 뜻은?", a: ["처음부터 다시 시작하다", "그림을 다시 그리다", "칠판에 쓰다", "계획을 취소하다"], c: 0 },
        { q: "'Hang in there'의 뜻은?", a: ["조금만 견뎌", "거기 매달려", "빨리 와", "포기해"], c: 0 },
        { q: "'Hit the sack'의 뜻은?", a: ["잠자리에 들다", "자루를 치다", "짐을 싸다", "휴식을 취하다"], c: 0 },
        { q: "'It's not rocket science'의 뜻은?", a: ["전혀 어렵지 않다", "과학은 어렵다", "우주 공부다", "복잡하다"], c: 0 },
        { q: "'Make a long story short'의 뜻은?", a: ["요약하자면", "긴 얘기를 해봐", "짧게 말해", "결론을 내지 마"], c: 0 },
        { q: "'Miss the boat'의 뜻은?", a: ["기회를 놓치다", "배를 놓치다", "여행을 가다", "실수하다"], c: 0 },
        { q: "'No pain, no gain'의 뜻은?", a: ["고통 없이 얻는 게 없다", "아프지 마라", "열심히 일해라", "성공은 멀다"], c: 0 },
        { q: "'On the ball'의 뜻은?", a: ["기민하다 / 빠릿빠릿하다", "공 위에 있다", "운동 중이다", "준비가 안 됐다"], c: 0 },
        { q: "'Pull someone's leg'의 뜻은?", a: ["누구를 놀리다", "다리를 잡아당기다", "장난을 치다", "화나게 하다"], c: 0 },
        { q: "'Pull yourself together'의 뜻은?", a: ["마음을 가다듬어", "네 스스로 당겨", "함께 해", "정리해"], c: 0 },
        { q: "'So far so good'의 뜻은?", a: ["지금까지는 좋다", "너무 멀다", "아주 좋다", "괜찮아질 거야"], c: 0 },
        { q: "'Speak of the devil'의 뜻은?", a: ["호랑이도 제 말 하면 온다", "악마를 말해", "무서운 얘기 하지 마", "말 조심해"], c: 0 },
        { q: "'That's the last straw'의 뜻은?", a: ["더는 못 참아", "마지막 빨대야", "끝났어", "운이 없네"], c: 0 },
        { q: "'The best of both worlds'의 뜻은?", a: ["양쪽의 장점만 취함", "세상에서 최고", "두 개의 세상", "완벽한 조화"], c: 0 },
        { q: "'Time flies when you're having fun'의 뜻은?", a: ["즐거우면 시간이 빨리 간다", "시간은 파리 같다", "재미있게 놀아라", "시간은 흐른다"], c: 0 },
        { q: "'To make matters worse'의 뜻은?", a: ["설상가상으로", "일을 더 잘 하려고", "문제를 해결하다", "상황이 좋아지다"], c: 0 },
        { q: "'Under the radar'의 뜻은?", a: ["눈에 띄지 않게", "레이더 밑으로", "비밀리에", "조심해서"], c: 0 },
        { q: "'Wrap your head around something'의 뜻은?", a: ["이해하려고 애쓰다", "머리를 감싸다", "포장하다", "기억하다"], c: 0 },
        { q: "'You can say that again'의 뜻은?", a: ["완전 동감이야", "다시 말해줄래", "한 번 더 말해", "그건 틀렸어"], c: 0 },
        { q: "'Your guess is as good as mine'의 뜻은?", a: ["나도 모르긴 마찬가지야", "네 추측이 맞아", "네가 더 잘 알아", "추측해 봐"], c: 0 },
        { q: "'A bird in the hand is worth two in the bush'의 뜻은?", a: ["남의 떡보다 내 떡이 낫다", "손안의 새는 소중하다", "두 마리 토끼를 잡지 마라", "작은 것에 만족해라"], c: 0 },
        { q: "'A blessing in disguise'의 뜻은?", a: ["전화위복", "변장한 축복", "가짜 축복", "운이 좋다"], c: 0 },
        { q: "'A penny for your thoughts'의 뜻은?", a: ["무슨 생각 하니?", "돈 좀 빌려줘", "네 생각은 틀렸어", "생각 좀 해"], c: 0 },
        { q: "'A perfect storm'의 뜻은?", a: ["최악의 상황", "완벽한 폭풍", "날씨가 안 좋다", "위기를 기회로"], c: 0 },
        { q: "'Actions speak louder than words'의 뜻은?", a: ["말보다 행동이 중요하다", "말을 크게 해라", "행동을 조심해라", "말은 쉽다"], c: 0 },
        { q: "'Add insult to injury'의 뜻은?", a: ["불난 집에 부채질하다", "부상을 입히다", "욕을 하다", "상처에 약 바르다"], c: 0 },
        { q: "'As right as rain'의 뜻은?", a: ["아주 건강한 / 정상적인", "비가 오는 것처럼", "맞는 말이다", "옳다"], c: 0 },
        { q: "'Beat around the bush'의 뜻은?", a: ["본론을 피하다 / 말을 돌리다", "덤불을 치다", "주위를 서성이다", "사냥을 하다"], c: 0 },
        { q: "'Calm before the storm'의 뜻은?", a: ["폭풍전야", "폭풍 후의 고요", "평화롭다", "긴장을 풀어라"], c: 0 },
        { q: "'Don't cry over spilt milk'의 뜻은?", a: ["이미 엎질러진 물이다", "우유를 쏟지 마라", "울지 마라", "실수해도 괜찮다"], c: 0 },
        { q: "'Don't judge a book by its cover'의 뜻은?", a: ["겉모습으로 판단하지 마라", "책 표지를 보지 마라", "심미안을 가져라", "공부해라"], c: 0 },
    ],
};

const CATEGORIES = [
    { id: 'history', name: '한국 역사', icon: '🇰🇷', desc: '5천년 역사의 숨결' },
    { id: 'kpop', name: 'K-POP 90-00', icon: '🎶', desc: '라떼는 말이야 히트곡' },
    { id: 'english', name: '영어 숙어', icon: '🇺🇸', desc: '네이티브급 어휘력' },
];

const App = () => {
    const [view, setView] = useState('home');
    const [category, setCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [showFeedback, setShowFeedback] = useState(null);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [isAnswering, setIsAnswering] = useState(false);
    const [history, setHistory] = useState([]);

    // Helper: Shuffle array
    const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

    // Start New Quiz
    const startQuiz = (catId) => {
        const allQuestions = QUESTIONS_DATA[catId];
        // 10 random questions, each with shuffled options
        const selected = shuffleArray(allQuestions).slice(0, 10).map(q => {
            const correctText = q.a[q.c];
            const shuffledA = shuffleArray(q.a);
            return { ...q, a: shuffledA, c: shuffledA.indexOf(correctText) };
        });

        setCategory(CATEGORIES.find(c => c.id === catId));
        setQuestions(selected);
        setCurrentIndex(0);
        setScore(0);
        setHistory([]);
        setView('quiz');
        resetRound();
    };

    const resetRound = useCallback(() => {
        setTimeLeft(10);
        setShowFeedback(null);
        setSelectedIdx(null);
        setIsAnswering(false);
    }, []);

    // Update timer on each question
    useEffect(() => {
        if (view === 'quiz') {
            resetRound();
        }
    }, [currentIndex, view, resetRound]);

    // Main Timer Loop
    useEffect(() => {
        let timer;
        if (view === 'quiz' && !showFeedback && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && !showFeedback && view === 'quiz') {
            handleAnswer(-1); // Auto-fail on timeout
        }
        return () => clearInterval(timer);
    }, [view, showFeedback, timeLeft]);

    const handleAnswer = (index) => {
        if (isAnswering) return;
        setIsAnswering(true);
        setSelectedIdx(index);

        const currentQ = questions[currentIndex];
        const isCorrect = index === currentQ.c;
        const feedbackType = index === -1 ? 'timeout' : isCorrect ? 'correct' : 'wrong';

        if (isCorrect) setScore(s => s + 1);

        setHistory(prev => [...prev, {
            q: currentQ.q,
            status: feedbackType,
            correctA: currentQ.a[currentQ.c]
        }]);

        setShowFeedback(feedbackType);

        // Delay before next question
        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setShowFeedback(null);
                setSelectedIdx(null);
                setIsAnswering(false);
                setCurrentIndex(prev => prev + 1);
            } else {
                setView('result');
            }
        }, 1200);
    };

    const renderHome = () => (
        <div className="flex flex-col items-center justify-center p-6 h-full animate-in fade-in duration-700">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">마스터 퀴즈</h1>
                <p className="text-gray-500">10초 안에 정답을 맞혀봐!</p>
            </div>
            <div className="w-full max-w-sm space-y-4">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => startQuiz(cat.id)}
                        className="w-full flex items-center p-5 bg-white border border-gray-100 rounded-3xl shadow-sm active:scale-[0.98] transition-all group text-left"
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-2xl mr-4 group-active:bg-blue-50">
                            {cat.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-lg">{cat.name}</h3>
                            <p className="text-sm text-gray-400">{cat.desc}</p>
                        </div>
                        <ChevronRight className="text-gray-300" size={20} />
                    </button>
                ))}
            </div>
        </div>
    );

    const renderQuiz = () => {
        const currentQ = questions[currentIndex];
        if (!currentQ) return null;
        const progress = ((currentIndex + 1) / questions.length) * 100;

        return (
            <div key={`q-${currentIndex}`} className="flex flex-col h-full p-6 animate-in slide-in-from-right duration-300 select-none">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Q {currentIndex + 1}/10
            </span>
                        <span className="text-sm text-gray-400 font-medium">{category.name}</span>
                    </div>
                    <button onClick={() => setView('home')} className="p-2 text-gray-300 active:text-gray-600 transition-colors">
                        <Home size={22} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center overflow-y-auto pb-4">
                    <div className="w-full mb-8">
                        <div className="flex justify-center mb-6">
                            <div className={`relative w-16 h-16 flex items-center justify-center rounded-full border-4 transition-colors ${timeLeft < 4 ? 'border-red-400 text-red-500 animate-pulse' : 'border-blue-500 text-blue-600'}`}>
                                <span className="text-xl font-black">{timeLeft}</span>
                                <Timer className="absolute -top-2 -right-2 bg-white" size={16} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 break-keep leading-tight min-h-[4.5rem]">
                            {currentQ.q}
                        </h2>
                    </div>

                    <div className="w-full space-y-3 mb-4">
                        {currentQ.a.map((opt, idx) => {
                            let btnStyle = "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all duration-200 outline-none ";

                            if (showFeedback) {
                                if (idx === currentQ.c) {
                                    btnStyle += "border-green-500 bg-green-50 text-green-700 ";
                                } else if (idx === selectedIdx) {
                                    btnStyle += "border-red-400 bg-red-50 text-red-600 ";
                                } else {
                                    btnStyle += "border-gray-100 opacity-50 grayscale-[0.5] ";
                                }
                            } else {
                                btnStyle += "border-gray-100 bg-white active:bg-blue-50 active:border-blue-200 active:scale-[0.98]";
                            }

                            return (
                                <button
                                    key={`btn-${currentIndex}-${idx}`}
                                    disabled={!!showFeedback}
                                    onClick={() => handleAnswer(idx)}
                                    className={btnStyle}
                                >
                                    <span className="inline-block w-6 text-gray-300 font-normal mr-2">{idx + 1}.</span>
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Floating Icons for Feedback */}
                {showFeedback && (
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                        <div className="animate-in zoom-in duration-300">
                            {showFeedback === 'correct' && <CheckCircle2 className="text-green-500 w-32 h-32 opacity-80" />}
                            {showFeedback === 'wrong' && <XCircle className="text-red-500 w-32 h-32 opacity-80" />}
                            {showFeedback === 'timeout' && (
                                <div className="bg-red-500 text-white px-8 py-4 rounded-3xl font-bold text-2xl shadow-xl">시간 초과!</div>
                            )}
                        </div>
                    </div>
                )}

                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
            </div>
        );
    };

    const renderResult = () => {
        const isSuccess = score >= 7;
        return (
            <div className="flex flex-col p-6 h-full animate-in zoom-in duration-500 overflow-y-auto select-none">
                <div className="text-center py-6">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className={isSuccess ? "text-yellow-500" : "text-blue-500"} size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-1">{score} / 10</h2>
                    <p className="text-gray-500 font-medium mb-6 px-4 leading-snug">
                        {isSuccess ? "와 진짜 대박인데 형? 마스터 인정!" : "조금만 더 집중하면 다 맞힐 수 있어!"}
                    </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-4 mb-6">
                    <h3 className="flex items-center text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                        <BarChart3 size={14} className="mr-2" /> 퀴즈 리포트
                    </h3>
                    <div className="space-y-2">
                        {history.map((h, i) => (
                            <div key={i} className="flex items-start bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                <div className="mt-1 mr-3 flex-shrink-0">
                                    {h.status === 'correct' ? <CheckCircle2 className="text-green-500" size={16} /> : <XCircle className="text-red-400" size={16} />}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-semibold text-gray-800 truncate mb-0.5">{h.q}</p>
                                    {h.status !== 'correct' && <p className="text-xs text-blue-500 font-medium">정답: {h.correctA}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-4 space-y-3">
                    <button onClick={() => startQuiz(category.id)} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-100 active:bg-blue-700 transition-colors">
                        <RefreshCw size={18} /><span>다시 도전하기</span>
                    </button>
                    <button onClick={() => setView('home')} className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl active:bg-gray-200 transition-colors">
                        홈으로 이동
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center font-sans antialiased text-gray-900 sm:p-4 overflow-hidden">
            {/* App Container */}
            <div className="w-full h-screen sm:h-[800px] sm:max-h-[90vh] sm:max-w-[420px] bg-white sm:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative flex flex-col sm:border sm:border-gray-100">

                {/* Status Bar Decoy */}
                <div className="h-6 sm:h-10 flex justify-end items-center px-8 pt-4">
                    <div className="flex space-x-1.5 opacity-20">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <div className="w-2 h-2 bg-black rounded-full" />
                    </div>
                </div>

                <main className="flex-1 flex flex-col overflow-hidden">
                    {view === 'home' && renderHome()}
                    {view === 'quiz' && renderQuiz()}
                    {view === 'result' && renderResult()}
                </main>
            </div>
        </div>
    );
};

export default App;