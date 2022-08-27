import React from 'react'
import { Icon } from '@chakra-ui/react'

export const PlusIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="13px" height="13px" viewBox="0 0 13 13" fill="none" {...props}>
    <path d="M6.5 0V13M0 6.5H13" stroke="white" strokeWidth="1.5" />
  </Icon>
)

export const MinusIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="13px" height="3px" viewBox="0 0 13 3" fill="none" {...props}>
    <path d="M0 1.5H13" stroke="white" strokeWidth="1.5" />
  </Icon>
)

export const InfoIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="14px" height="14px" viewBox="0 0 14 14" fill="none" {...props}>
    <path
      d="M6.99968 0.332031C5.68114 0.332031 4.3922 0.723024 3.29588 1.45557C2.19955 2.18811 1.34506 3.2293 0.840481 4.44747C0.335896 5.66565 0.203874 7.00609 0.461109 8.2993C0.718344 9.59251 1.35328 10.7804 2.28563 11.7127C3.21798 12.6451 4.40587 13.28 5.69908 13.5373C6.99228 13.7945 8.33273 13.6625 9.5509 13.1579C10.7691 12.6533 11.8103 11.7988 12.5428 10.7025C13.2753 9.60617 13.6663 8.31724 13.6663 6.9987C13.6644 5.23119 12.9614 3.53664 11.7116 2.28682C10.4617 1.03701 8.76718 0.333997 6.99968 0.332031ZM6.99968 12.332C5.94484 12.332 4.9137 12.0192 4.03664 11.4332C3.15957 10.8472 2.47599 10.0142 2.07232 9.03968C1.66865 8.06514 1.56303 6.99278 1.76882 5.95822C1.97461 4.92365 2.48256 3.97334 3.22844 3.22746C3.97432 2.48158 4.92463 1.97363 5.9592 1.76784C6.99376 1.56206 8.06612 1.66767 9.04066 2.07134C10.0152 2.47501 10.8481 3.15859 11.4342 4.03566C12.0202 4.91272 12.333 5.94386 12.333 6.9987C12.3314 8.41269 11.769 9.7683 10.7691 10.7681C9.76928 11.768 8.41367 12.3304 6.99968 12.332ZM6.99968 6.66536C6.82287 6.66536 6.6533 6.7356 6.52827 6.86063C6.40325 6.98565 6.33301 7.15522 6.33301 7.33203V9.33203C6.33301 9.50884 6.40325 9.67841 6.52827 9.80344C6.6533 9.92846 6.82287 9.9987 6.99968 9.9987C7.17649 9.9987 7.34606 9.92846 7.47108 9.80344C7.59611 9.67841 7.66634 9.50884 7.66634 9.33203V7.33203C7.66634 7.15522 7.59611 6.98565 7.47108 6.86063C7.34606 6.7356 7.17649 6.66536 6.99968 6.66536ZM6.99968 3.9987C6.83486 3.9987 6.67374 4.04757 6.5367 4.13914C6.39966 4.23071 6.29285 4.36086 6.22978 4.51313C6.16671 4.6654 6.1502 4.83296 6.18236 4.99461C6.21451 5.15626 6.29388 5.30474 6.41042 5.42129C6.52697 5.53783 6.67545 5.6172 6.8371 5.64935C6.99875 5.68151 7.16631 5.665 7.31858 5.60193C7.47085 5.53886 7.601 5.43205 7.69257 5.29501C7.78414 5.15797 7.83301 4.99685 7.83301 4.83203C7.83301 4.61102 7.74521 4.39906 7.58893 4.24278C7.43265 4.0865 7.22069 3.9987 6.99968 3.9987Z"
      fill="#858585"
    />
  </Icon>
)

export const DownloadIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="14px" height="14px" viewBox="0 0 14 14" fill="none" {...props}>
    <path
      d="M7 9.5L3.75 6.5M7 9.5L10 6.5M7 9.5V0M13 6V12.5H1V6"
      stroke="white"
      strokeWidth="2"
    />
  </Icon>
)

export const OilIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
    <g opacity="0.5">
      <path
        d="M20 30V27.5C20.9665 27.4165 21.8726 26.9946 22.5586 26.3086C23.2446 25.6226 23.6665 24.7165 23.75 23.75H26.25C26.1692 25.3815 25.4848 26.9247 24.3297 28.0797C23.1747 29.2348 21.6315 29.9192 20 30Z"
        fill="white"
      />
      <path
        d="M20 34.9994C17.0174 34.9958 14.1581 33.8093 12.0491 31.7003C9.94007 29.5913 8.75364 26.732 8.75 23.7494C8.81728 21.5566 9.46142 19.4202 10.6175 17.5556L18.9412 4.29565C19.0615 4.12691 19.2203 3.98935 19.4045 3.89444C19.5886 3.79952 19.7928 3.75 20 3.75C20.2072 3.75 20.4114 3.79952 20.5955 3.89444C20.7797 3.98935 20.9385 4.12691 21.0588 4.29565L29.3462 17.4906C30.5217 19.3725 31.1785 21.5318 31.25 23.7494C31.2464 26.732 30.0599 29.5913 27.9509 31.7003C25.8419 33.8093 22.9826 34.9958 20 34.9994ZM20 7.3094L12.7725 18.8194C11.8412 20.3007 11.3162 22.0009 11.25 23.7494C11.25 26.07 12.1719 28.2956 13.8128 29.9366C15.4538 31.5775 17.6794 32.4994 20 32.4994C22.3206 32.4994 24.5462 31.5775 26.1872 29.9366C27.8281 28.2956 28.75 26.07 28.75 23.7494C28.6787 21.9765 28.1406 20.2539 27.19 18.7556L20 7.3094Z"
        fill="white"
      />
    </g>
  </Icon>
)

export const GasIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="26px" height="32px" viewBox="0 0 26 32" fill="none" {...props}>
    <path
      d="M15.0896 30.9475C14.9082 30.7127 14.7963 30.4318 14.7666 30.1366C14.7369 29.8414 14.7906 29.5438 14.9216 29.2776C15.2653 28.6097 15.4001 27.846 15.3122 27.0941C15.2402 26.5576 15.063 26.0406 14.7907 25.5727C14.522 25.1109 14.1626 24.7083 13.7341 24.3891C12.2739 23.2917 11.2492 21.7128 10.8416 19.9322C7.50582 24.3051 8.78507 26.7875 10.3827 28.9749C10.57 29.2313 10.6687 29.5418 10.6637 29.8593C10.6588 30.1769 10.5505 30.4841 10.3553 30.7346C10.1564 30.9881 9.88954 31.1798 9.58582 31.2873C9.28562 31.3927 8.9612 31.4083 8.65226 31.3323C6.49413 30.8049 4.46295 29.8011 3.08604 28.2015C2.30553 27.313 1.70463 26.2816 1.31656 25.1645C0.92408 24.0378 0.749757 22.8467 0.802908 21.6548C0.802908 21.6548 0.543151 16.8444 6.34374 12.1317C6.34374 12.1317 13.199 6.31549 10.8202 2.01485C10.7325 1.8033 10.7065 1.57126 10.7452 1.34556C10.784 1.11987 10.8858 0.909747 11.0389 0.739497C11.1877 0.572574 11.3843 0.455488 11.602 0.404127C11.8197 0.352766 12.0479 0.369619 12.2557 0.452397L12.5408 0.565674C15.1229 2.19786 17.141 4.58415 18.3219 7.40139C19.4546 10.1611 19.4468 13.3778 18.6812 16.2429C19.316 15.6726 19.8453 14.991 20.2456 14.2254L20.3023 14.1004C20.689 13.1688 21.9057 13.4656 22.3628 14.075C22.5307 14.3426 26.8392 20.6041 24.5248 25.8871C23.6786 27.4877 22.4427 28.8493 20.9312 29.846C19.6629 30.6876 18.2457 31.2796 16.7555 31.5901C16.4475 31.6549 16.1273 31.6291 15.8337 31.5158C15.5374 31.4006 15.2795 31.2044 15.0896 30.9495V30.9475ZM11.6404 15.7898C11.8228 15.6948 12.0341 15.6713 12.2328 15.7241C12.4316 15.7768 12.6034 15.902 12.7146 16.0749C12.7928 16.1902 12.8435 16.321 12.8611 16.4616L12.949 17.1433C12.9881 18.1413 12.9763 19.1842 13.365 20.1432C13.7673 21.1275 14.3923 21.9986 15.1853 22.6782C16.2068 23.3504 16.9975 24.3198 17.4508 25.4555C17.8805 26.557 17.9391 27.7796 17.6149 28.9183C18.6068 28.6054 19.5287 28.1033 20.3296 27.4398L20.5308 27.2757C21.187 26.7347 21.728 26.059 22.1186 25.2895C22.5112 24.5219 22.7475 23.6782 22.81 22.811C22.937 20.8092 22.2553 18.7995 21.1948 17.0065C20.7105 17.7096 20.0425 18.2546 19.2711 18.5768C18.7887 18.7819 18.277 18.9088 17.7555 18.9479C17.4568 18.9671 17.159 18.8993 16.8981 18.7526C16.6332 18.602 16.4159 18.3801 16.2712 18.112C16.1513 17.8958 16.0828 17.6549 16.071 17.4081C16.0591 17.1612 16.1042 16.9149 16.2028 16.6882C17.0075 14.7898 17.2575 12.6844 16.9157 10.6396C16.5111 8.30006 15.3906 6.14371 13.7087 4.46789C13.4041 8.77439 8.98819 12.784 8.08197 13.6473C7.9415 13.7796 7.79554 13.906 7.64448 14.0262C2.90636 17.8639 3.23056 21.3599 3.23056 21.5142C3.13647 22.903 3.44791 24.2892 4.12702 25.5043C4.83989 26.764 5.86524 27.8031 7.09567 28.512C5.6758 25.391 5.6758 21.6451 10.9159 16.2741L11.6424 15.7859L11.6404 15.7898Z"
      fill="white"
      opacity="0.5"
    />
  </Icon>
)

export const CoalIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="26px" height="29px" viewBox="0 0 26 29" fill="none" {...props}>
    <path
      d="M4.9508 27.015H12.1663C13.1246 27.015 14.0511 26.671 14.7771 26.0455L22.8747 19.0695M4.9508 27.015L2.06735 22.6174C1.64005 21.9657 1.41241 21.2034 1.41241 20.4241V13.1121C1.41241 12.3414 1.63502 11.5872 2.05346 10.9401L6.40094 4.21668M4.9508 27.015L12.5331 21.9763C12.8898 21.7393 13.2061 21.4466 13.4699 21.1093L17.6541 15.7599M22.8747 19.0695L24.1313 10.3254C24.2204 9.70538 24.1626 9.07309 23.9627 8.47947L22.4106 3.87209M22.8747 19.0695L17.6541 15.7599M22.4106 3.87209L18.1494 1.52401C17.5581 1.19821 16.894 1.02734 16.219 1.02734H11.8022C10.8965 1.02734 10.0177 1.33468 9.30939 1.89907L6.40094 4.21668M22.4106 3.87209L16.784 6.94296M6.40094 4.21668L16.784 6.94296M17.6541 15.7599L16.784 6.94296"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
  </Icon>
)

export const LineIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="24px" height="2px" viewBox="0 0 24 2" fill="none" {...props}>
    <line
      x1="8.74228e-08"
      y1="1"
      x2="24"
      y2="1"
      stroke="#040404"
      strokeWidth="2"
      strokeDasharray="8 8"
    />
  </Icon>
)

export const DashIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="12px" height="12px" viewBox="0 0 12 12" fill="none" {...props}>
    <g clipPath="url(#clip0_2195_25417)">
      <g opacity="0.5">
        <line
          x1="404.916"
          y1="-757.646"
          x2="-776.647"
          y2="423.916"
          stroke="#040404"
        />
        <line
          x1="407.745"
          y1="-754.818"
          x2="-773.818"
          y2="426.744"
          stroke="#040404"
        />
        <line
          x1="410.573"
          y1="-751.99"
          x2="-770.99"
          y2="429.573"
          stroke="#040404"
        />
        <line
          x1="413.402"
          y1="-749.16"
          x2="-768.161"
          y2="432.403"
          stroke="#040404"
        />
        <line
          x1="416.23"
          y1="-746.332"
          x2="-765.333"
          y2="435.231"
          stroke="#040404"
        />
        <line
          x1="419.059"
          y1="-743.504"
          x2="-762.504"
          y2="438.059"
          stroke="#040404"
        />
        <line
          x1="421.887"
          y1="-740.676"
          x2="-759.676"
          y2="440.887"
          stroke="#040404"
        />
        <line
          x1="424.716"
          y1="-737.848"
          x2="-756.847"
          y2="443.715"
          stroke="#040404"
        />
        <line
          x1="427.544"
          y1="-735.018"
          x2="-754.018"
          y2="446.545"
          stroke="#040404"
        />
        <line
          x1="430.373"
          y1="-732.189"
          x2="-751.19"
          y2="449.373"
          stroke="#040404"
        />
        <line
          x1="433.201"
          y1="-729.361"
          x2="-748.362"
          y2="452.202"
          stroke="#040404"
        />
        <line
          x1="436.03"
          y1="-726.533"
          x2="-745.533"
          y2="455.03"
          stroke="#040404"
        />
        <line
          x1="438.858"
          y1="-723.703"
          x2="-742.705"
          y2="457.86"
          stroke="#040404"
        />
        <line
          x1="441.687"
          y1="-720.875"
          x2="-739.876"
          y2="460.688"
          stroke="#040404"
        />
        <line
          x1="444.516"
          y1="-718.047"
          x2="-737.047"
          y2="463.516"
          stroke="#040404"
        />
        <line
          x1="447.344"
          y1="-715.219"
          x2="-734.219"
          y2="466.344"
          stroke="#040404"
        />
        <line
          x1="450.172"
          y1="-712.391"
          x2="-731.391"
          y2="469.172"
          stroke="#040404"
        />
        <line
          x1="453.001"
          y1="-709.561"
          x2="-728.562"
          y2="472.002"
          stroke="#040404"
        />
        <line
          x1="455.83"
          y1="-706.732"
          x2="-725.733"
          y2="474.83"
          stroke="#040404"
        />
        <line
          x1="458.658"
          y1="-703.904"
          x2="-722.905"
          y2="477.659"
          stroke="#040404"
        />
        <line
          x1="461.487"
          y1="-701.076"
          x2="-720.076"
          y2="480.487"
          stroke="#040404"
        />
        <line
          x1="464.315"
          y1="-698.248"
          x2="-717.248"
          y2="483.315"
          stroke="#040404"
        />
        <line
          x1="467.144"
          y1="-695.418"
          x2="-714.419"
          y2="486.145"
          stroke="#040404"
        />
        <line
          x1="469.972"
          y1="-692.59"
          x2="-711.591"
          y2="488.973"
          stroke="#040404"
        />
        <line
          x1="472.801"
          y1="-689.762"
          x2="-708.762"
          y2="491.801"
          stroke="#040404"
        />
        <line
          x1="475.629"
          y1="-686.934"
          x2="-705.934"
          y2="494.629"
          stroke="#040404"
        />
        <line
          x1="478.458"
          y1="-684.105"
          x2="-703.105"
          y2="497.457"
          stroke="#040404"
        />
        <line
          x1="481.286"
          y1="-681.275"
          x2="-700.277"
          y2="500.287"
          stroke="#040404"
        />
        <line
          x1="484.115"
          y1="-678.447"
          x2="-697.448"
          y2="503.116"
          stroke="#040404"
        />
        <line
          x1="486.943"
          y1="-675.619"
          x2="-694.62"
          y2="505.944"
          stroke="#040404"
        />
        <line
          x1="489.772"
          y1="-672.791"
          x2="-691.791"
          y2="508.772"
          stroke="#040404"
        />
        <line
          x1="492.601"
          y1="-669.963"
          x2="-688.962"
          y2="511.6"
          stroke="#040404"
        />
        <line
          x1="495.429"
          y1="-667.133"
          x2="-686.134"
          y2="514.43"
          stroke="#040404"
        />
        <line
          x1="498.257"
          y1="-664.305"
          x2="-683.306"
          y2="517.258"
          stroke="#040404"
        />
        <line
          x1="501.086"
          y1="-661.477"
          x2="-680.477"
          y2="520.086"
          stroke="#040404"
        />
        <line
          x1="503.915"
          y1="-658.648"
          x2="-677.648"
          y2="522.914"
          stroke="#040404"
        />
        <line
          x1="506.743"
          y1="-655.82"
          x2="-674.82"
          y2="525.742"
          stroke="#040404"
        />
        <line
          x1="509.572"
          y1="-652.99"
          x2="-671.991"
          y2="528.573"
          stroke="#040404"
        />
        <line
          x1="512.4"
          y1="-650.162"
          x2="-669.163"
          y2="531.401"
          stroke="#040404"
        />
        <line
          x1="515.229"
          y1="-647.334"
          x2="-666.334"
          y2="534.229"
          stroke="#040404"
        />
        <line
          x1="518.057"
          y1="-644.506"
          x2="-663.506"
          y2="537.057"
          stroke="#040404"
        />
        <line
          x1="520.886"
          y1="-641.678"
          x2="-660.677"
          y2="539.885"
          stroke="#040404"
        />
        <line
          x1="523.714"
          y1="-638.848"
          x2="-657.849"
          y2="542.715"
          stroke="#040404"
        />
        <line
          x1="526.543"
          y1="-636.019"
          x2="-655.02"
          y2="545.543"
          stroke="#040404"
        />
        <line
          x1="529.371"
          y1="-633.191"
          x2="-652.192"
          y2="548.371"
          stroke="#040404"
        />
        <line
          x1="532.2"
          y1="-630.363"
          x2="-649.363"
          y2="551.2"
          stroke="#040404"
        />
        <line
          x1="535.028"
          y1="-627.535"
          x2="-646.535"
          y2="554.028"
          stroke="#040404"
        />
        <line
          x1="537.857"
          y1="-624.705"
          x2="-643.706"
          y2="556.858"
          stroke="#040404"
        />
        <line
          x1="540.686"
          y1="-621.877"
          x2="-640.877"
          y2="559.686"
          stroke="#040404"
        />
        <line
          x1="543.514"
          y1="-619.049"
          x2="-638.049"
          y2="562.514"
          stroke="#040404"
        />
        <line
          x1="546.342"
          y1="-616.221"
          x2="-635.221"
          y2="565.342"
          stroke="#040404"
        />
        <line
          x1="549.171"
          y1="-613.393"
          x2="-632.392"
          y2="568.17"
          stroke="#040404"
        />
        <line x1="552" y1="-610.562" x2="-629.563" y2="571" stroke="#040404" />
        <line
          x1="554.828"
          y1="-607.734"
          x2="-626.735"
          y2="573.828"
          stroke="#040404"
        />
        <line
          x1="557.656"
          y1="-604.906"
          x2="-623.907"
          y2="576.657"
          stroke="#040404"
        />
        <line
          x1="560.485"
          y1="-602.078"
          x2="-621.078"
          y2="579.485"
          stroke="#040404"
        />
        <line
          x1="563.314"
          y1="-599.248"
          x2="-618.249"
          y2="582.315"
          stroke="#040404"
        />
        <line
          x1="566.142"
          y1="-596.42"
          x2="-615.421"
          y2="585.143"
          stroke="#040404"
        />
        <line
          x1="568.971"
          y1="-593.592"
          x2="-612.592"
          y2="587.971"
          stroke="#040404"
        />
        <line
          x1="571.799"
          y1="-590.764"
          x2="-609.764"
          y2="590.799"
          stroke="#040404"
        />
        <line
          x1="574.627"
          y1="-587.936"
          x2="-606.935"
          y2="593.627"
          stroke="#040404"
        />
        <line
          x1="577.456"
          y1="-585.105"
          x2="-604.107"
          y2="596.457"
          stroke="#040404"
        />
        <line
          x1="580.285"
          y1="-582.277"
          x2="-601.278"
          y2="599.285"
          stroke="#040404"
        />
        <line
          x1="583.113"
          y1="-579.449"
          x2="-598.45"
          y2="602.114"
          stroke="#040404"
        />
        <line
          x1="585.942"
          y1="-576.621"
          x2="-595.621"
          y2="604.942"
          stroke="#040404"
        />
        <line
          x1="588.77"
          y1="-573.793"
          x2="-592.793"
          y2="607.77"
          stroke="#040404"
        />
        <line
          x1="591.599"
          y1="-570.963"
          x2="-589.964"
          y2="610.6"
          stroke="#040404"
        />
        <line
          x1="594.427"
          y1="-568.135"
          x2="-587.136"
          y2="613.428"
          stroke="#040404"
        />
        <line
          x1="597.256"
          y1="-565.307"
          x2="-584.307"
          y2="616.256"
          stroke="#040404"
        />
        <line
          x1="600.085"
          y1="-562.478"
          x2="-581.478"
          y2="619.084"
          stroke="#040404"
        />
        <line
          x1="602.913"
          y1="-559.65"
          x2="-578.65"
          y2="621.912"
          stroke="#040404"
        />
        <line
          x1="605.742"
          y1="-556.82"
          x2="-575.821"
          y2="624.742"
          stroke="#040404"
        />
        <line
          x1="608.57"
          y1="-553.992"
          x2="-572.993"
          y2="627.571"
          stroke="#040404"
        />
        <line
          x1="611.398"
          y1="-551.164"
          x2="-570.164"
          y2="630.399"
          stroke="#040404"
        />
        <line
          x1="614.227"
          y1="-548.336"
          x2="-567.336"
          y2="633.227"
          stroke="#040404"
        />
        <line
          x1="617.056"
          y1="-545.508"
          x2="-564.507"
          y2="636.055"
          stroke="#040404"
        />
        <line
          x1="619.884"
          y1="-542.678"
          x2="-561.679"
          y2="638.885"
          stroke="#040404"
        />
        <line
          x1="622.713"
          y1="-539.85"
          x2="-558.85"
          y2="641.713"
          stroke="#040404"
        />
        <line
          x1="625.541"
          y1="-537.021"
          x2="-556.022"
          y2="644.541"
          stroke="#040404"
        />
        <line
          x1="628.37"
          y1="-534.193"
          x2="-553.193"
          y2="647.369"
          stroke="#040404"
        />
        <line
          x1="631.198"
          y1="-531.363"
          x2="-550.365"
          y2="650.2"
          stroke="#040404"
        />
        <line
          x1="634.027"
          y1="-528.535"
          x2="-547.536"
          y2="653.028"
          stroke="#040404"
        />
        <line
          x1="636.856"
          y1="-525.707"
          x2="-544.707"
          y2="655.856"
          stroke="#040404"
        />
        <line
          x1="639.684"
          y1="-522.879"
          x2="-541.879"
          y2="658.684"
          stroke="#040404"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_2195_25417">
        <rect width="12" height="12" rx="6" fill="white" />
      </clipPath>
    </defs>
  </Icon>
)
