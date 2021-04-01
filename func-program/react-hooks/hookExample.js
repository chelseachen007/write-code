// 示例主要演示状态管理的简化
// 1  单一组件中状态的简化处理和Context的变量传递
// 1.1 ClassComponent
// pages/OverviewPage.js
class OverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      easterEggsCount: 0
    }
    this.increaseEasterEggsCount = this.increaseEasterEggsCount.bind(this)
  }

  increaseEasterEggsCount (_easterEggsCount) {
    if (100 * Math.random() > 95) {
      this.setState({
        easterEggsCount: _easterEggsCount + 1
      })
    }
  }

  render () {
    const _easterEggsCount = this.state.easterEggsCount
    return (
      <EasterEggsCountContext.Provider value={_easterEggsCount}>
        <div className="overview-page"
          onClick={() => this.increaseEasterEggsCount(_easterEggsCount)}>
          <div className="overview-page-matrix">
            <span>{$$title1}</span>
            <Suspense fallback={<div>Loading</div>}>
              <OverviewMatrix />
            </Suspense>
          </div>
          <div className="overview-page-evaluation">
            <span>{$$title2}</span>
            <OverviewEvaluation />
          </div>
          <div>
            <OverviewLink />
          </div>
        </div>
      </EasterEggsCountContext.Provider>
    )
  }
}

// pages/overview/OverviewLink.js
class OverviewLink extends React.Component {
  render () {
    return (
      <EasterEggsCountContext.Consumer>
        {
          easterEggsCount => (
            <div className='overview-link'>
              <div className="over-view-l-page">
                {easterEggsCount}
              </div>
              <div>&gt;</div>
            </div>
          )
        }
      </EasterEggsCountContext.Consumer>
    )
  }
}

OverviewLink.contextType = EasterEggsCountContext

// 1.2 使用函数式组件和userReducer、useContext后代码简化
// pages/OverviewPage.js
function OverviewPage () {
  const [easterEggsCount, dispatch] = userReducer((state, action) => {
    if (action === 'increase') {
      return (100 * Math.random() > 95) ? state + 1 : state
    }
  }, 0)

  return (
    <EasterEggsCountContext.Provider value={easterEggsCount}>
      <div className="overview-page"
        onClick={() => dispatch('increase')}>
        <div className="overview-page-matrix">
          <span>{$$title1}</span>
          <OverviewMatrix />
        </div>
        <div className="overview-page-evaluation">
          <span>{$$title2}</span>
          <OverviewEvaluation />
        </div>
        <div>
          <OverviewLink />
        </div>
      </div>
    </EasterEggsCountContext.Provider>
  )
}

// pages/overview/OverviewLink.js
function OverviewLink () {
  const easterEggsCount = useContext(EasterEggsCountContext)
  return (
    <div className='overview-link'>
      <div className="over-view-l-page">
        {easterEggsCount}
      </div>
      <div>&gt;</div>
    </div>
  )
}

// 2 使用自定义Hooks从服务端获取关键信息
// pages/DetailPage.js
const useIntro = (puzzleId) => {
  const [intro, setIntro] = useState(null);
  useEffect(() => {
    requset(puzzleId).then(res => {
      setIntro(res)
    }).catch(e => console.error(e))
  }, '');
  return {
    intro,
    setIntro,
  }
};

// 模拟向服务端发起数据请求
function requset (puzzleId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const _intro = data.getIntroById(puzzleId)
      resolve(_intro)
    }, 1000)
  })
}

function DetailPage (props) {
  const { intro } = useIntro(props.puzzleId);

  return (
    <div className='detail-page'>
      <div className='detail-intro'>
        <div className='detail-intro-title'>关卡介绍</div>
        <div className='detail-intro-content'>
          {intro}
        </div>
      </div>
      <div className='detail-link'>
        <DetailLink />
      </div>
    </div>
  )
}

export default DetailPage