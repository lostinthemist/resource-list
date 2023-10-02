본 작업엔 리소스 등록 validation이 유일하게 없습니다.
또는 Typed Design System를 install해서 이거를 통해 SVG 아이콘을 사용하려고 했는데 설명/guide가 매우 부족하기때문에 Typed Design System 라이브러리로 못 사용합니다. 대신에 본 작업에서 다른 방식으로 SVG 아이콘을 사용하게 됐습니다.
    
    1. url 리소스
        1. “https://” 또는 “http://” scheme 이 포함되어야 한다.
        2. youtube url은 embed url로 변경해야 한다.
            - example) https://www.youtube.com/watch?v=0OSUw7hJfVs  → 
            https://www.youtube.com/embed/0OSUw7hJfVs
        3. 반드시 보여야 하는 url
            1. https://www.robinwieruch.de/react-libraries/
            2. https://typed.do/blog-kr/how-to-make-good-usability-product/
    2. image 리소스
        1. .png, .jpg만 업로드 되면 된다.
        2. 동시에 여러개의 이미지를 올릴 수 있어야 한다.
            1. *각 이미지 별로 validation이 일어나야 한다.
    3. 리소스 등록 validation
        1. 300ms ~ 1000ms 랜덤 딜레이가 일어나야 한다.
        2. 등록시 성공할 확률이 80%이어야 한다.
        3. 성공시 성공 토스트가 떠야 한다. (디자인 시안 없습니다.)
        4. 실패시 실패 토스트가 떠야 한다. (디자인 시안 없습니다.)
- 리소스 삭제가 가능해야 한다.
- url 리소스와 image 리소스를 클릭하면 뷰어에 리소스가 보여야한다.
    1. 뷰어는 닫을 수 있어야 한다.
    2. url 리소스 뷰어는 <iframe> 태그를 활용한다.
- 리소스 이름 변경이 가능해야 한다.
    - url 리소스의 경우 이름 변경 후에도 등록시의 url이 뷰어에 나타나야 합니다.


