let principal = {
  props:{
      isActive:true
  },
  data(){
    return{
      os: "",
      buttonToFacebook: {
        type: "roundend-button",
        content:
          "<span class='ml-2'> <img src='../images/facebook.png' style=' height:14px'> Iniciar sesión con Facebook</span>",
        typeButton: "button",
        childClass: "fb",
        size: "",
      },
      buttonToGoogle: {
        type: "roundend-button",
        content:
          "<img src='../images/color_google_plus.png' style='width:24px;'>",
        typeButton: "button",
        childClass: "google",
        size: "",
      },
      buttonToApple: {
        type: "roundend-button",
        content:
          "<span class='ml-3'><img src='../images/apple.png' style='width:14px;'> Iniciar sesión con Apple</span>",
        typeButton: "button",
        childClass: "apple",
        size: "",
      },
    }
  },
  components: {
    "rounded-button": roundedButton,
    "component-form": componentForm,
    "primary-button": primaryButton,
    "primary-button-block": primaryButtonBlock,
  },
  mounted() {
      this.os = getMobileOperatingSystem()
  },
  methods: {
      handleRegister(){
        console.log("Register")
        this.$emit('active-register')
      },
      handleStartWithOutLogin(){
        comunicateWebView('close')
      },
      handleLogin(){
        this.$emit('active-login')
      },requestFacebook() {
        console.log("facebook")
        this.$emit("request-facebook");
      },
      requestGoogle() {
        this.$emit("request-google");
      },
      requestApple() {
        console.log("apple")
        this.$emit("request-apple");
      },
      recuperarPass() {
        this.$emit("reset-password");
      },
  },
  template:`
  <div class="container-f" v-show="isActive">
            
                <div class=logo>
                    <img class=logo-img src="../images/logo.png" alt="">
                </div>
                    <div class="presentation">
                    <svg id="principal-svg" width="100vw" height="50vh" viewBox="0 0 414 430" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="triangles">
                    <rect x="1.60864" y="18.2628" width="435.796" height="405.721" fill="url(#pattern0)"/>
                    <path d="M154.613 175.502L136.643 217.195L202.136 191.137L154.613 175.502Z" fill="url(#paint0_linear)"/>
                    <path d="M202.136 191.137L178.366 282.049L136.643 217.195L202.136 191.137Z" fill="url(#paint1_linear)"/>
                    <path d="M154.613 175.502V132.078L202.136 191.137L154.613 175.502Z" fill="url(#paint2_linear)"/>
                    <path d="M202.136 191.137L232.271 170.873L154.613 132.078L202.136 191.137Z" fill="url(#paint3_linear)"/>
                    <path d="M202.136 191.137L227.852 209.669L232.271 170.873L202.136 191.137Z" fill="url(#paint4_linear)"/>
                    <path d="M227.852 209.669L267.623 181.297L232.271 170.873L227.852 209.669Z" fill="url(#paint5_linear)"/>
                    <path d="M232.271 170.873L267.623 113.546V181.297L232.271 170.873Z" fill="url(#paint6_linear)"/>
                    <path d="M136.643 217.195L120.652 249.625L178.366 282.049L136.643 217.195Z" fill="url(#paint7_linear)"/>
                    <path d="M136.643 217.195L97.8138 178.977L120.652 249.625L136.643 217.195Z" fill="url(#paint8_linear)"/>
                    <path d="M97.8138 178.977L154.613 175.502L136.643 217.195L97.8138 178.977Z" fill="url(#paint9_linear)"/>
                    <path d="M97.8138 178.977L57.246 243.253L120.652 249.625L97.8138 178.977Z" fill="url(#paint10_linear)"/>
                    <path d="M97.8138 152.341V178.977L154.613 175.502L97.8138 152.341Z" fill="url(#paint11_linear)"/>
                    <path d="M154.613 132.078V175.502L97.8138 152.341L154.613 132.078Z" fill="url(#paint12_linear)"/>
                    <path d="M97.8138 152.341L126.216 113.546L154.613 132.078L97.8138 152.341Z" fill="url(#paint13_linear)"/>
                    <path d="M159.246 103.7L154.613 132.078L126.216 113.546L159.246 103.7Z" fill="url(#paint14_linear)"/>
                    <path d="M128.88 82.8533L126.216 113.546L159.246 103.7L128.88 82.8533Z" fill="url(#paint15_linear)"/>
                    <path d="M97.8138 152.341L52.6076 139.027L97.8138 178.977V152.341Z" fill="url(#paint16_linear)"/>
                    <path d="M120.652 249.624L149.509 293.632L178.366 282.049L120.652 249.624Z" fill="url(#paint17_linear)"/>
                    <path d="M154.613 132.078L267.623 113.546L232.271 170.873L154.613 132.078Z" fill="url(#paint18_linear)"/>
                    <path d="M202.136 191.137L227.852 209.669L178.366 282.049L202.136 191.137Z" fill="url(#paint19_linear)"/>
                    <path d="M227.852 209.669L305.297 221.829L267.623 181.297L227.852 209.669Z" fill="url(#paint20_linear)"/>
                    <path d="M159.246 103.7L267.623 113.546L154.613 132.078L159.246 103.7Z" fill="url(#paint21_linear)"/>
                    <path d="M178.366 282.049L219.523 308.107L149.509 293.632L178.366 282.049Z" fill="url(#paint22_linear)"/>
                    <path d="M227.852 209.669L219.523 308.107L178.366 282.049L227.852 209.669Z" fill="url(#paint23_linear)"/>
                    <path d="M219.523 308.107L305.297 221.829L227.852 209.669L219.523 308.107Z" fill="url(#paint24_linear)"/>
                    <path d="M267.623 113.546L305.297 147.421L267.623 181.297V113.546Z" fill="url(#paint25_linear)"/>
                    <path d="M267.623 113.546L291.387 85.1733L305.297 147.421L267.623 113.546Z" fill="url(#paint26_linear)"/>
                    <path d="M149.509 293.632L146.122 333.778L219.523 308.107L149.509 293.632Z" fill="url(#paint27_linear)"/>
                    <path d="M120.652 249.624L146.122 333.778L149.509 293.632L120.652 249.624Z" fill="url(#paint28_linear)"/>
                    <path d="M219.523 308.107L239.103 339.376L305.297 221.829L219.523 308.107Z" fill="url(#paint29_linear)"/>
                    <path d="M291.387 85.1733L352.819 77.6417L305.297 147.421L291.387 85.1733Z" fill="url(#paint30_linear)"/>
                    <path d="M232.271 68.9557L267.623 113.546L291.387 85.1733L232.271 68.9557Z" fill="url(#paint31_linear)"/>
                    <path d="M232.271 68.9557L159.246 103.7L267.623 113.546L232.271 68.9557Z" fill="url(#paint32_linear)"/>
                    <path d="M36.6116 281.253L63.1688 281.684L49.6743 272.443L36.6116 281.253Z" fill="url(#paint33_linear)"/>
                    <path d="M303.491 57.4061L317.972 41.1885L308.74 36.8679L303.491 57.4061Z" fill="url(#paint34_linear)"/>
                    <path d="M196.185 85.2349L180.178 75.3553L185.265 65.9015L196.185 85.2349Z" fill="url(#paint35_linear)"/>
                    <rect x="277.557" y="144.91" width="122.831" height="107.594" fill="url(#pattern1)"/>
                    <path d="M300.249 207.467L331.613 167.831L355.309 184.334L300.249 207.467Z" fill="url(#paint36_linear)"/>
                    <path d="M88.9632 227.646L39.2084 258.54L77.1737 261.785L88.9632 227.646Z" fill="url(#paint37_linear)"/>
                    <path d="M69.6917 73.2539L98.2905 103.941L94.0335 78.4655L69.6917 73.2539Z" fill="url(#paint38_linear)"/>
                    <path d="M307.501 219.706L328.163 226.509L328.449 216.321L307.501 219.706Z" fill="url(#paint39_linear)"/>
                    <path d="M143.222 51.6509L189.701 156.23L125.257 136.527L143.222 51.6509Z" fill="url(#paint40_linear)"/>
                    <rect x="3.29123" y="246.34" width="200.231" height="183.247" fill="url(#pattern2)"/>
                    <path d="M78.5086 367.917L42.6465 351.649L141.769 285.59L78.5086 367.917Z" fill="url(#paint41_linear)"/>
                    <rect x="205.205" y="205.432" width="195.744" height="159.15" fill="url(#pattern3)"/>
                    <path d="M244.627 245.035L301.286 302.716L339.151 265.797L244.627 245.035Z" fill="url(#paint42_linear)"/>
                    <rect x="-9.60876" y="130.34" width="150.313" height="124.406" fill="url(#pattern4)"/>
                    <path d="M78.7834 193.093L45.3556 169.977L30.156 191.781L78.7834 193.093Z" fill="url(#paint43_linear)"/>
                    </g>
                    <g id="spheres">
                    
                    <path id="sphere_one"d="M418.374 254.108C417.325 255.156 415.631 255.156 414.582 254.108C413.533 253.06 413.533 251.367 414.582 250.319C415.631 249.271 417.325 249.271 418.374 250.319C419.417 251.367 419.417 253.06 418.374 254.108Z" fill="url(#paint45_linear)"/>
                    <path id="sphere_two"d="M236.225 14.0265C235.177 15.0744 233.483 15.0744 232.434 14.0265C231.385 12.9786 231.385 11.2862 232.434 10.2383C233.483 9.19035 235.177 9.19035 236.225 10.2383C237.274 11.2862 237.274 12.9786 236.225 14.0265Z" fill="url(#paint46_linear)"/>
                    <path id="sphere_three"  d="M111.056 156.623C108.212 159.464 103.596 159.464 100.753 156.623C97.9091 153.782 97.9091 149.17 100.753 146.328C103.596 143.487 108.212 143.487 111.056 146.328C113.9 149.17 113.9 153.782 111.056 156.623Z" fill="url(#paint59_radial)"/>
                    <path id="sphere_four"  d="M325.645 127.864C322.801 130.705 318.185 130.705 315.342 127.864C312.498 125.022 312.498 120.41 315.342 117.569C318.185 114.728 322.801 114.728 325.645 117.569C328.489 120.41 328.489 125.022 325.645 127.864Z" fill="url(#paint60_linear)"/>
                    <path id="sphere_five"  d="M363.521 224.923C360.677 227.764 356.061 227.764 353.217 224.923C350.374 222.082 350.374 217.47 353.217 214.628C356.061 211.787 360.677 211.787 363.521 214.628C366.364 217.47 366.364 222.082 363.521 224.923Z" fill="url(#paint61_radial)"/>
                    <path id="sphere_six"  d="M121.09 64.2316C118.998 66.3218 115.605 66.3218 113.513 64.2316C111.42 62.1413 111.42 58.751 113.513 56.6608C115.605 54.5705 118.998 54.5705 121.09 56.6608C123.182 58.751 123.182 62.1413 121.09 64.2316Z" fill="url(#paint62_linear)"/>
                    <path id="sphere_seven"  d="M28.2883 219.846C26.1962 221.936 22.803 221.936 20.7109 219.846C18.6189 217.755 18.6189 214.365 20.7109 212.275C22.803 210.185 26.1962 210.185 28.2883 212.275C30.3859 214.365 30.3803 217.755 28.2883 219.846Z" fill="url(#paint63_linear)"/>
                    <path id="sphere_eight"  d="M165.101 343.377C163.009 345.468 159.616 345.468 157.524 343.377C155.432 341.287 155.432 337.897 157.524 335.807C159.616 333.716 163.009 333.716 165.101 335.807C167.193 337.897 167.193 341.287 165.101 343.377Z" fill="url(#paint64_linear)"/>
                    <path id="sphere_nine"  d="M44.503 45.9462C43.4542 46.9941 41.7604 46.9941 40.7116 45.9462C39.6628 44.8982 39.6628 43.2059 40.7116 42.158C41.7604 41.11 43.4542 41.11 44.503 42.158C45.5519 43.2059 45.5463 44.9038 44.503 45.9462Z" fill="url(#paint65_linear)"/>
                    <path id="sphere_ten"  d="M259.316 314.333C258.268 315.38 256.574 315.38 255.525 314.333C254.476 313.285 254.476 311.592 255.525 310.544C256.574 309.496 258.268 309.496 259.316 310.544C260.36 311.592 260.36 313.29 259.316 314.333Z" fill="url(#paint66_linear)"/>
                    <path id="sphere_eleven"  d="M19.735 289.776C18.6862 290.824 16.9923 290.824 15.9435 289.776C14.8947 288.728 14.8947 287.036 15.9435 285.988C16.9923 284.94 18.6862 284.94 19.735 285.988C20.7838 287.036 20.7838 288.734 19.735 289.776Z" fill="url(#paint67_linear)"/>
                    <path id="sphere_twelve"  d="M386.281 137.435C385.232 138.483 383.538 138.483 382.489 137.435C381.44 136.387 381.44 134.695 382.489 133.647C383.538 132.599 385.232 132.599 386.281 133.647C387.329 134.695 387.329 136.393 386.281 137.435Z" fill="url(#paint68_linear)"/>
                    <path id="sphere_thirteen"  d="M109.844 280.468C108.796 281.516 107.102 281.516 106.053 280.468C105.004 279.42 105.004 277.728 106.053 276.68C107.102 275.632 108.796 275.632 109.844 276.68C110.893 277.728 110.893 279.42 109.844 280.468Z" fill="url(#paint69_linear)"/>
                    <path id="sphere_eight"  d="M204.676 269.557C201.833 272.399 197.217 272.399 194.373 269.557C191.53 266.716 191.53 262.104 194.373 259.263C197.217 256.422 201.833 256.422 204.676 259.263C207.52 262.104 207.52 266.716 204.676 269.557Z" fill="url(#paint44_linear)"/>
                    </g>
                    <g id="user">
                   
                    
                    <path d="M269.913 187.029C269.672 180.585 262.916 176.747 257.741 174.376C257.258 174.157 256.775 173.947 256.292 173.736V182.294C260.64 184.096 266.227 186.888 268.666 191.132C269.383 189.891 269.859 188.534 269.913 187.029Z" fill="#335FC1"/>
                    <path d="M269.913 191.163C269.882 189.595 269.851 188.089 269.89 187.029C269.835 188.534 269.383 189.891 268.666 191.132C266.407 195.024 261.49 197.661 257.741 199.385C254.811 200.727 251.772 201.842 248.679 202.786V211.312C250.642 210.712 252.583 210.056 254.484 209.315C260.508 206.983 269.633 202.887 269.913 195.29C269.96 194.057 269.937 192.591 269.913 191.163Z" fill="#A1E4FF"/>
                    <path d="M245.99 314.648C245.99 323.128 228.473 330 206.864 330C185.255 330 167.738 323.128 167.738 314.648V307.347H245.99V314.648Z" fill="url(#paint47_linear)"/>
                    <path d="M259.573 301.067C259.573 312.487 235.977 321.739 206.864 321.739C177.751 321.739 154.156 312.48 154.156 301.067V291.23H259.573V301.067Z" fill="url(#paint48_linear)"/>
                    <path  d="M246.941 259.084C241.478 261.596 235.548 263.101 229.595 264.107V276.986C234.574 276.128 239.476 274.88 244.151 273.094C246.31 272.267 248.866 271.19 251.118 269.747V256.845C249.715 257.734 248.235 258.483 246.941 259.084Z" fill="#A1E4FF"/>
                    <path   d="M161.613 201.616C160.655 201.273 159.696 200.937 158.761 200.563C155.885 199.424 153.01 198.082 150.439 196.335V204.884C153.82 207.209 157.639 208.949 161.613 210.314V201.616Z" fill="#E64F51"/>
                    <path d="M206.864 311.902C235.974 311.902 259.573 302.647 259.573 291.23C259.573 279.814 235.974 270.559 206.864 270.559C177.754 270.559 154.156 279.814 154.156 291.23C154.156 302.647 177.754 311.902 206.864 311.902Z" fill="url(#paint49_linear)"/>
                    <path d="M206.864 307.339C231.305 307.339 251.118 300.127 251.118 291.23C251.118 282.334 231.305 275.122 206.864 275.122C182.423 275.122 162.61 282.334 162.61 291.23C162.61 300.127 182.423 307.339 206.864 307.339Z" fill="url(#paint50_linear)"/>
                    <g id="person">
                    <path d="M204.293 118.64C201.612 117.298 200.124 114.131 200.303 111.136C200.482 108.14 202.118 105.363 204.308 103.319C206.1 101.642 208.719 100.347 210.963 101.353C212.405 102.001 213.379 103.475 214.867 103.998C216.309 104.505 217.805 103.717 219.254 103.241C224.343 101.572 231.894 103.998 230.483 113.32C230.304 114.529 229.844 115.816 230.507 116.838C231.325 118.086 233.195 118.554 233.561 120.005C233.99 121.721 231.894 123.242 232.143 124.99C232.377 126.62 234.325 127.228 235.743 128.055C239.094 130.005 240.2 134.733 238.634 138.274C237.068 141.824 233.343 144.109 229.509 144.64C223.135 145.521 216.41 141.613 214.002 135.638C213.34 133.992 212.981 132.236 212.272 130.614C211.563 128.991 210.41 127.439 208.742 126.838L204.293 118.64Z" fill="url(#paint51_linear)"/>
                    <path d="M215.186 285.731C215.186 285.731 207.963 294.717 205.835 297.705C203.809 300.56 207.293 302.175 209.817 301.582C211.851 301.098 220.735 295.981 224.086 294.023C224.88 293.563 225.364 292.689 225.356 291.753L225.325 288.024L215.186 285.731Z" fill="url(#paint52_linear)"/>
                    <path d="M189.588 278.788C189.588 278.788 181.523 286.308 179.411 289.304C177.393 292.167 180.884 293.774 183.409 293.165C185.442 292.674 193.516 287.182 197.046 285.364C197.887 284.935 198.417 284.062 198.433 283.094L198.503 278.788H189.588Z" fill="url(#paint53_linear)"/>
                    <path d="M209.147 204.978C209.147 204.978 205.672 231.532 203.77 246.111C201.776 261.362 198.479 280.824 198.479 280.824C198.479 280.824 189.682 284.896 189.51 278.812C189.51 278.812 186.51 210.899 187.141 197.419C187.733 184.868 191.178 180.421 191.178 180.421L229.743 186.085C236.265 202.848 229.821 219.012 228.66 241.478L225.325 288.812C225.325 288.812 215.545 292.674 214.789 287.018C214.789 287.018 212.038 243.295 209.147 204.978Z" fill="#0A2042"/>
                    <path d="M193.477 167.371L190.57 179.618C188.918 184.704 198.924 188.838 209.911 191.81C220.797 194.759 229.844 191.686 230.927 189.072C232.127 186.178 231.426 178.986 230.927 173.767C234.411 174.945 236.577 171.786 236.577 169.594L234.076 149.445C234.076 143.126 230.164 137.479 224.249 135.263L208.384 129.319C202.446 127.096 194.793 130.115 193.749 135.591L186.549 161.044C185.879 164.563 188.746 167.753 192.315 167.457L193.477 167.371Z" fill="url(#paint54_linear)"/>
                    <path d="M212.88 139.468C216.106 139.468 218.724 136.847 218.724 133.617V124.451C218.724 124.069 218.413 123.757 218.031 123.757H207.737C207.355 123.757 207.043 124.069 207.043 124.451V133.617C207.035 136.854 209.654 139.468 212.88 139.468Z" fill="url(#paint55_linear)"/>
                    <path d="M219.854 125.356C219.776 127.018 218.545 128.406 216.901 128.672L208.438 130.068C206.513 130.396 204.713 129.03 204.519 127.088L203.498 117.103C209.56 120.216 214.29 120.13 217.423 118.983C218.88 118.453 219.823 117.033 219.8 115.481C219.979 115.41 220.08 115.364 220.08 115.364C220.992 114.927 222.535 114.903 222.449 116.596C222.324 119.061 220.08 120.598 220.08 120.598L219.854 125.356Z" fill="url(#paint56_linear)"/>
                    <path d="M211.509 166.053L212.031 165.608C212.522 165.187 212.694 164.492 212.452 163.892L206.366 148.524C206.187 148.072 205.797 147.736 205.322 147.635L197.194 145.919C196.797 145.833 196.392 145.911 196.049 146.129L195.09 146.754L202.034 162.472C202.221 162.917 211.034 165.951 211.509 166.053Z" fill="#99B9D6"/>
                    <path d="M202.165 164.274L210.932 166.193C211.469 166.31 211.914 165.78 211.711 165.272L205.446 149.445C205.267 148.992 204.877 148.657 204.402 148.556L195.635 146.644C195.097 146.527 194.653 147.058 194.856 147.565L201.121 163.385C201.3 163.837 201.69 164.173 202.165 164.274Z" fill="#CEDEF2"/>
                    <path d="M209.155 156.777C209.155 156.777 204.838 156.692 204.69 159.812C204.526 163.252 212.256 166.583 213.371 166.216C213.051 162.901 215.116 159.282 215.116 159.282C214.555 157.909 211.212 156.887 209.155 156.777Z" fill="url(#paint57_linear)"/>
                    <path d="M199.952 155.397C199.952 155.397 204.269 155.311 204.417 158.431C204.581 161.871 197.903 164.882 196.788 164.516C195.347 164.04 194.318 159.36 195.043 157.581C195.596 156.216 197.895 155.506 199.952 155.397Z" fill="url(#paint58_linear)"/>
                    <path d="M222.059 170.202C225.815 171.817 229.119 173.143 230.927 173.767C229.229 172.886 225.987 171.396 222.239 169.781C218.483 168.167 215.179 166.84 213.371 166.216C215.07 167.09 218.311 168.588 222.059 170.202Z" fill="#897DFF"/>
                    <path d="M221.397 159.617C218.724 159.375 216.379 159.25 215.116 159.274C216.355 159.523 218.678 159.828 221.35 160.077C221.911 160.124 222.457 160.171 222.971 160.218C222.831 159.594 222.691 159.001 222.558 158.431C222.441 157.963 222.332 157.519 222.223 157.113C222.013 156.294 221.81 155.615 221.647 155.116C221.701 155.639 221.802 156.341 221.943 157.175C222.013 157.589 222.098 158.041 222.184 158.517C222.231 158.751 222.278 159.001 222.324 159.25C222.348 159.375 222.371 159.5 222.402 159.633L222.418 159.718V159.726V159.734C222.41 159.734 222.418 159.734 222.402 159.726C222.293 159.718 222.184 159.703 222.075 159.695C221.849 159.664 221.623 159.64 221.397 159.617Z" fill="#897DFF"/>
                    </g>
                    <path d="M177.561 153.501V127.813C171.038 129.062 164.571 130.918 158.773 133.976C156.326 135.263 153.856 136.823 152.071 138.976C150.599 140.755 150.131 142.565 149.975 144.554C150.256 151.122 159.155 154.89 165.061 156.926C165.817 156.668 166.526 156.434 167.165 156.224C170.563 155.116 174.038 154.227 177.561 153.501Z" fill="#335FC1"/>
                    <path d="M165.057 156.926C159.143 154.89 150.275 151.122 150.002 144.546C150.002 152.409 150.002 160.272 150.002 168.135C149.955 168.362 149.893 168.58 149.87 168.814C149.893 169.68 149.955 170.538 150.166 171.349C150.789 173.814 152.644 175.733 154.592 177.247C160.982 182.231 169.67 184.454 177.564 185.983V160.342C174.042 159.617 170.567 158.728 167.161 157.62C166.522 157.417 165.813 157.183 165.057 156.926Z" fill="#A1E4FF"/>
                    <path d="M263.905 156.926C263.897 155.787 263.89 154.648 263.882 153.509C263.874 150.95 263.89 148.392 263.82 145.833C263.82 145.7 263.796 144.85 263.781 144.421C263.773 144.335 263.765 144.257 263.757 144.179C263.749 144.172 263.734 144.265 263.726 144.538C263.453 151.122 254.585 154.882 248.671 156.918C247.915 157.175 247.206 157.409 246.567 157.62C244.681 158.228 242.78 158.774 240.855 159.258V184.977C243.832 184.22 246.762 183.315 249.622 182.231C255.263 180.094 263.173 176.56 263.749 169.688C263.757 169.555 263.788 169.43 263.796 169.298C263.812 168.876 263.819 168.447 263.827 168.026C263.827 167.87 263.827 167.823 263.82 168.003C263.89 165.444 263.874 162.885 263.882 160.327C263.89 159.196 263.897 158.065 263.905 156.926Z" fill="#E64F51"/>
                    <path d="M285.685 210.61C285.677 208.122 285.693 205.633 285.631 203.145C285.623 202.919 285.623 202.685 285.615 202.458C285.6 201.772 285.561 200.719 285.529 201.639C285.342 207.388 279.451 211.375 274.223 213.972C272.859 214.651 271.534 215.236 270.373 215.735C269.921 215.93 269.461 216.11 269.009 216.297V242C276.03 239.27 285.023 234.792 285.568 226.797C285.576 226.695 285.584 226.602 285.592 226.5C285.592 226.43 285.6 226.344 285.6 226.258C285.615 225.806 285.615 225.353 285.631 224.901C285.693 222.413 285.677 219.924 285.685 217.436C285.685 216.297 285.693 215.158 285.701 214.019C285.693 212.888 285.685 211.749 285.685 210.61Z" fill="#A1E4FF"/>
                    <path d="M233.92 224.332C228.932 224.901 223.922 225.291 218.904 225.541V251.221C231.675 250.604 244.759 249.2 257.219 245.854V220.189C249.575 222.21 241.689 223.442 233.92 224.332Z" fill="#E64F51"/>
                    <path d="M147.111 217.225C144.984 216.445 142.241 215.415 139.506 214.074C133.926 211.343 128.284 207.342 128.105 201.639C128.105 201.912 128.105 202.716 128.105 203.488C127.965 210.696 127.965 217.904 128.105 225.112C128.136 226.75 128.16 228.333 128.752 229.878C130.022 233.201 133.046 235.666 135.929 237.546C141.407 241.119 147.696 243.537 154.156 245.308V219.511C151.779 218.832 149.426 218.075 147.111 217.225ZM128.105 203.067C128.105 203.004 128.105 202.973 128.105 202.973C128.105 202.997 128.105 203.036 128.105 203.067Z" fill="#A1E4FF"/>
                    <path d="M170.948 204.455V212.872C172.624 213.247 174.284 213.574 175.912 213.886C180.611 214.776 185.365 215.431 190.134 215.876V207.638C183.627 207.045 177.175 206.023 170.948 204.455Z" fill="#A1E4FF"/>
                    <path d="M228.223 206.803C224.826 207.217 221.358 207.544 217.852 207.794V216.297C225.667 215.852 233.608 214.971 241.323 213.247V204.674C236.982 205.602 232.579 206.273 228.223 206.803Z" fill="#A1E4FF"/>
                    <path d="M157.382 251.119C158.317 252.773 159.47 254.146 160.787 255.316C162.112 254.232 163.616 253.342 165.104 252.57C165.486 252.367 165.883 252.196 166.273 252.008V239.145C165.611 239.465 164.956 239.8 164.309 240.159C160.093 242.507 157.436 245.206 157.008 249.793C157.062 249.957 157.132 250.214 157.21 250.597C157.265 250.768 157.319 250.94 157.382 251.119Z" fill="#A52D32"/>
                    <path d="M192.339 265.457V278.055C199.243 278.781 206.21 278.937 213.121 278.648C215.584 278.547 218.062 278.383 220.548 278.156V265.293C211.399 266.229 201.768 266.44 192.339 265.457Z" fill="#A1E4FF"/>
                    <path d="M169.577 260.246C166.304 258.99 163.257 257.508 160.787 255.316C159.47 254.146 158.317 252.773 157.382 251.119C157.327 250.948 157.273 250.768 157.21 250.597C157.132 250.214 157.062 249.957 157.008 249.793C156.976 250.144 156.953 250.503 156.945 250.877C156.937 251.408 156.914 251.938 156.899 252.477C156.657 258.374 155.917 264.38 160.912 268.437C165.54 272.189 171.658 274.202 177.556 275.582V262.789C174.837 262.071 172.172 261.237 169.577 260.246Z" fill="#E64F51"/>
                    </g>
                    <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0"/>
                    </pattern>
                    <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1"/>
                    </pattern>
                    <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image2"/>
                    </pattern>
                    <pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image3"/>
                    </pattern>
                    <pattern id="pattern4" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image4"/>
                    </pattern>
                    <linearGradient id="paint0_linear" x1="128.786" y1="207.433" x2="193.964" y2="175.686" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0415" stop-color="#D8D9DD"/>
                    <stop offset="1" stop-color="#EDEEF0"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="204.97" y1="198.974" x2="141.133" y2="267.213" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#BCBEC4"/>
                    <stop offset="1" stop-color="#EDEEF0"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear" x1="154.612" y1="161.607" x2="202.135" y2="161.607" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#BCBEC4"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear" x1="154.612" y1="161.607" x2="232.272" y2="161.607" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#BCBEC4"/>
                    </linearGradient>
                    <linearGradient id="paint4_linear" x1="237.582" y1="163.538" x2="211.535" y2="206.119" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#BCBEC4"/>
                    <stop offset="1" stop-color="#EDEEF0"/>
                    </linearGradient>
                    <linearGradient id="paint5_linear" x1="227.85" y1="190.27" x2="267.624" y2="190.27" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint6_linear" x1="248.953" y1="180.996" x2="256.765" y2="142.342" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint7_linear" x1="175.235" y1="277.933" x2="125.29" y2="230.118" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#BCBEC4"/>
                    <stop offset="0.2531" stop-color="#CCCED2"/>
                    <stop offset="0.715" stop-color="#E4E5E8"/>
                    <stop offset="1" stop-color="#EDEEF0"/>
                    </linearGradient>
                    <linearGradient id="paint8_linear" x1="83.1511" y1="184.045" x2="138.736" y2="244.459" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint9_linear" x1="97.8154" y1="196.35" x2="154.612" y2="196.35" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint10_linear" x1="57.2468" y1="214.301" x2="120.65" y2="214.301" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint11_linear" x1="97.8154" y1="165.66" x2="154.612" y2="165.66" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#BCBEC4"/>
                    </linearGradient>
                    <linearGradient id="paint12_linear" x1="170.957" y1="172.657" x2="90.588" y2="117.872" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#BCBEC4"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint13_linear" x1="126.213" y1="152.342" x2="126.213" y2="113.546" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint14_linear" x1="142.731" y1="132.075" x2="142.731" y2="103.702" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint15_linear" x1="148.321" y1="115.716" x2="120.966" y2="80.9497" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.0238" stop-color="#EEEFF1"/>
                    <stop offset="0.5286" stop-color="#FBFBFB"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint16_linear" x1="109.975" y1="170.316" x2="37.4025" y2="142.48" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.0238" stop-color="#EEEFF1"/>
                    <stop offset="0.5286" stop-color="#FBFBFB"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint17_linear" x1="120.65" y1="271.627" x2="178.366" y2="271.627" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint18_linear" x1="210.759" y1="121.615" x2="227.25" y2="176.633" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#BCBEC4"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint19_linear" x1="178.366" y1="236.595" x2="227.85" y2="236.595" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint20_linear" x1="227.85" y1="201.562" x2="305.295" y2="201.562" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.5645" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint21_linear" x1="154.612" y1="117.889" x2="267.624" y2="117.889" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint22_linear" x1="149.508" y1="295.079" x2="219.521" y2="295.079" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint23_linear" x1="178.366" y1="258.888" x2="227.85" y2="258.888" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint24_linear" x1="219.521" y1="258.888" x2="305.295" y2="258.888" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint25_linear" x1="267.624" y1="147.42" x2="305.295" y2="147.42" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint26_linear" x1="267.624" y1="116.296" x2="305.295" y2="116.296" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.6332" stop-color="#F1F2F3"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint27_linear" x1="146.12" y1="313.704" x2="219.521" y2="313.704" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint28_linear" x1="120.65" y1="291.7" x2="149.508" y2="291.7" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#BCBEC4"/>
                    </linearGradient>
                    <linearGradient id="paint29_linear" x1="219.521" y1="280.602" x2="305.295" y2="280.602" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#BCBEC4"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    </linearGradient>
                    <linearGradient id="paint30_linear" x1="287.837" y1="124.891" x2="333.445" y2="87.504" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.1836" stop-color="#F1F2F3"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint31_linear" x1="232.272" y1="91.252" x2="291.386" y2="91.252" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.5271" stop-color="#E4E5E8"/>
                    <stop offset="1" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint32_linear" x1="197.164" y1="125.21" x2="240.158" y2="81.31" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.3583" stop-color="#F5F5F7"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint33_linear" x1="43.6161" y1="287.984" x2="56.1545" y2="274.943" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.1836" stop-color="#F1F2F3"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint34_linear" x1="309.316" y1="58.3189" x2="312.582" y2="37.4681" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EDEEF0"/>
                    <stop offset="0.1836" stop-color="#F1F2F3"/>
                    <stop offset="1" stop-color="white"/>
                    </linearGradient>
                    <linearGradient id="paint35_linear" x1="188.856" y1="86.0855" x2="186.496" y2="65.7582" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint36_linear" x1="300.249" y1="187.649" x2="355.307" y2="187.649" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint37_linear" x1="52.6673" y1="236.221" x2="81.944" y2="253.872" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint38_linear" x1="69.6912" y1="88.5966" x2="98.2885" y2="88.5966" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#D8D9DD"/>
                    </linearGradient>
                    <linearGradient id="paint39_linear" x1="308.99" y1="225.41" x2="329.428" y2="220.079" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#D8D9DD"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint40_linear" x1="133.408" y1="54.2112" x2="161.898" y2="163.48" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#BCBEC4"/>
                    </linearGradient>
                    <linearGradient id="paint41_linear" x1="53.5562" y1="364.747" x2="98.9102" y2="319.766" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0376" stop-color="#BCBEC4"/>
                    <stop offset="0.5538" stop-color="#EDEEF0"/>
                    <stop offset="1" stop-color="#F7F7F8"/>
                    </linearGradient>
                    <linearGradient id="paint42_linear" x1="244.71" y1="273.957" x2="339.174" y2="273.687" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#BCBEC4"/>
                    </linearGradient>
                    <linearGradient id="paint43_linear" x1="76.007" y1="178.824" x2="29.4021" y2="187.901" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F7F7F8"/>
                    <stop offset="0.4462" stop-color="#EDEEF0"/>
                    <stop offset="0.9624" stop-color="#BCBEC4"/>
                    </linearGradient>
                    <linearGradient id="paint44_linear" x1="191.812" y1="252.426" x2="200.811" y2="266.437" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint45_linear" x1="410.988" y1="246.73" x2="417.564" y2="253.312" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint46_linear" x1="230.428" y1="7.64676" x2="236.345" y2="14.4569" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint47_linear" x1="167.736" y1="318.669" x2="245.992" y2="318.669" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#271C8E"/>
                    <stop offset="1" stop-color="#6950FF"/>
                    </linearGradient>
                    <linearGradient id="paint48_linear" x1="261.859" y1="306.489" x2="147.754" y2="306.489" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#6190D6"/>
                    <stop offset="1" stop-color="#B9D2FC"/>
                    </linearGradient>
                    <linearGradient id="paint49_linear" x1="153.027" y1="310.651" x2="218.98" y2="286.912" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#6190D6"/>
                    <stop offset="1" stop-color="#B9D2FC"/>
                    </linearGradient>
                    <linearGradient id="paint50_linear" x1="256.043" y1="270.029" x2="202.101" y2="293.237" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#6190D6"/>
                    <stop offset="1" stop-color="#B9D2FC"/>
                    </linearGradient>
                    <linearGradient id="paint51_linear" x1="219.809" y1="155" x2="219.809" y2="106.93" gradientUnits="userSpaceOnUse">
                    <stop offset="0.1257" stop-color="#93141D"/>
                    <stop offset="1" stop-color="#FF6161"/>
                    </linearGradient>
                    <linearGradient id="paint52_linear" x1="225.808" y1="284.999" x2="213.802" y2="294.494" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#271C8E"/>
                    <stop offset="1" stop-color="#6950FF"/>
                    </linearGradient>
                    <linearGradient id="paint53_linear" x1="198.825" y1="276.853" x2="187.067" y2="288.099" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#271C8E"/>
                    <stop offset="1" stop-color="#6950FF"/>
                    </linearGradient>
                    <linearGradient id="paint54_linear" x1="211.52" y1="134.477" x2="211.52" y2="188.061" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#271C8E"/>
                    <stop offset="1" stop-color="#6950FF"/>
                    </linearGradient>
                    <linearGradient id="paint55_linear" x1="212.877" y1="130.102" x2="212.877" y2="137.056" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF817B"/>
                    <stop offset="1" stop-color="#FFBFAB"/>
                    </linearGradient>
                    <linearGradient id="paint56_linear" x1="212.98" y1="118.933" x2="212.98" y2="127.44" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF817B"/>
                    <stop offset="1" stop-color="#FFBFAB"/>
                    </linearGradient>
                    <linearGradient id="paint57_linear" x1="215.496" y1="160.618" x2="204.48" y2="162.732" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF817B"/>
                    <stop offset="0.1256" stop-color="#FF8D84"/>
                    <stop offset="0.4689" stop-color="#FFA899"/>
                    <stop offset="0.7717" stop-color="#FFB9A6"/>
                    <stop offset="1" stop-color="#FFBFAB"/>
                    </linearGradient>
                    <linearGradient id="paint58_linear" x1="194.576" y1="159.163" x2="204.626" y2="161.091" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF817B"/>
                    <stop offset="0.1256" stop-color="#FF8D84"/>
                    <stop offset="0.4689" stop-color="#FFA899"/>
                    <stop offset="0.7717" stop-color="#FFB9A6"/>
                    <stop offset="1" stop-color="#FFBFAB"/>
                    </linearGradient>
                    <radialGradient id="paint59_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(96.93 139.968) scale(26.5413 26.5184)">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3436" stop-color="#52C0E9"/>
                    <stop offset="0.587" stop-color="#4E78D2"/>
                    <stop offset="0.762" stop-color="#4B4AC4"/>
                    <stop offset="0.8499" stop-color="#4A39BE"/>
                    </radialGradient>
                    <linearGradient id="paint60_linear" x1="309.366" y1="111.251" x2="320.211" y2="122.445" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <radialGradient id="paint61_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(348.726 210.469) scale(21.6355 21.6167)">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3518" stop-color="#52C0E9"/>
                    <stop offset="0.6104" stop-color="#4E78D2"/>
                    <stop offset="0.7963" stop-color="#4B4AC4"/>
                    <stop offset="0.8897" stop-color="#4A39BE"/>
                    </radialGradient>
                    <linearGradient id="paint62_linear" x1="111.433" y1="51.8276" x2="117.617" y2="60.9307" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint63_linear" x1="16.5754" y1="206.075" x2="26.2413" y2="218.273" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint64_linear" x1="153.177" y1="330.562" x2="162.106" y2="340.491" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint65_linear" x1="39.1403" y1="37.9409" x2="43.6205" y2="45.854" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint66_linear" x1="253.298" y1="306.491" x2="257.969" y2="313.243" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint67_linear" x1="11.7597" y1="282.295" x2="18.4087" y2="288.417" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint68_linear" x1="380.771" y1="129.985" x2="384.538" y2="135.786" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <linearGradient id="paint69_linear" x1="104.654" y1="273.922" x2="109.706" y2="281.06" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2107" stop-color="#55EAF7"/>
                    <stop offset="0.3747" stop-color="#52C0E9"/>
                    <stop offset="0.6753" stop-color="#4E78D2"/>
                    <stop offset="0.8914" stop-color="#4B4AC4"/>
                    <stop offset="1" stop-color="#4A39BE"/>
                    </linearGradient>
                    <image id="image0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwkAAALUCAYAAABATH7JAAAACXBIWXMAAAsSAAALEgHS3X78AAAA"/>
                    <image id="image1" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAADACAYAAACNkhYYAAAACXBIWXMAAAsSAAALEgHS3X78AAAA"/>
                    <image id="image2" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWUAAAFHCAYAAAB54V2GAAAACXBIWXMAAAsSAAALEgHS3X78AAAA"/>
                    <image id="image3" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV0AAAEcCAYAAABkjGd+AAAACXBIWXMAAAsSAAALEgHS3X78AAAA"/>
                    <image id="image4" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAADeCAYAAADIDT4DAAAACXBIWXMAAAsSAAALEgHS3X78AAAA"/>
                    </defs>
                    </svg>
                    
                    </div>
   
           
                <div class="buttons mb-5">
                    <button class="modern-button btnPrimary" @click="handleLogin">Iniciar sesión</button>
                    
                    <primary-button-block class="btnSecundary button__apple mt-3" :field="buttonToApple" @clicked-button="requestApple">
                    </primary-button-block>
                    <primary-button-block class="btnSecundary button__facebook mt-3" v-if="os != 'ios'" :field="buttonToFacebook"
                      @clicked-button="requestFacebook">
                    </primary-button-block>
                    <button class="modern-button btnSecundary mt-3" @click="handleRegister">Registrate</button>
                    <button class="modern-button btnSecundary mt-3" @click="handleStartWithOutLogin">Entrar como invitado</button>
                </div>
           
       </div>
    </div>
  `
}