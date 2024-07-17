import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import './MultiPlayer.css'
import { Card, CardHeader, CardBody, Heading, SimpleGrid, Text, Button, WrapItem } from '@chakra-ui/react'
import { clone, shuffle, take, trim } from 'lodash'
import { getDatabase, onValue, ref, set } from "firebase/database";
import useTextToSpeech from '../hooks/useTextToSpeech'
import vocabulariesDataMock from '../vocabulariesData.json'

function MultiPlayer() {
  const [vocabularies, setVocabularies] = useState<any>([])
  const [currentItem, setCurrentItem] = useState<any>()
  const [currentIndex, setCurrentIndex] = useState<any>()
  let count = useRef<any>(0)
  let timeNode = useRef<any>()
  let [failedCount, setFailedCount] = useState<any>(0)
  let [winner, setWinner] = useState<any>(false)
  let [isStartGame, setIsStartGame] = useState<any>(false)
  let [player, setPlayer] = useState<any>(0)
  let [playerList, setPlayerList] = useState<any>({})
  let [hasChoose, setHasChoose] = useState<any>(false)
  let [playerWinner, setPlayerWinner] = useState<any>("")
  const { handlePlay, VoiceSelect, VoicePlay } = useTextToSpeech()
  const intervalId = useRef<any>(0)
  const vocabulariesData = useMemo(() => {
    // Handle Format vocabulary
    let response = clone(vocabulariesDataMock)
    response = response.map((item: any) => {
      const searchIndex = String(item.sName).search('/')
      if (searchIndex > 0) {
        item.sName = trim(String(item.sName).substring(0, String(item.sName).search('/')))
      }
      return item
    })
    return response
  }, [])
  useEffect(() => {
    onListenWinner();
    onListenVocabulary();
    onListenStartGame();
  }, [])
  useEffect(() => {
    const db = getDatabase();
    if (isStartGame) {
      if (failedCount > 3) {
        clearInterval(intervalId.current)
      }
      else {
        if (intervalId.current) {
          clearInterval(intervalId.current)
        }
        timeNode.current = document.getElementById('timeID')
        intervalId.current = setInterval(() => {
          count.current += 0.1
          count.current = parseFloat(count.current.toFixed(1))
          timeNode.current.innerText = `Time: ${count.current} s`;
        }, 100)
      }
    }
    return () => {
      clearInterval(intervalId.current)
      if (player) {
        set(ref(db, 'games/players/' + player + '/isActive'), false);
      }
    }
  }, [isStartGame, player])

  useEffect(() => {
    if (winner) {
      const db = getDatabase();
      set(ref(db, 'games/winner'), {
        playerWinner: player,
        time: count.current
      });
    }
  }, [winner])

  function onListenWinner() {
    const db = getDatabase();
    const playerRef = ref(db, 'games/winner');
    onValue(playerRef, (snapshot) => {
      const newdata = snapshot.val();
      setPlayerWinner(newdata)
    });
  }
  function onListenVocabulary() {
    const db = getDatabase();
    const playerRef = ref(db, 'games/vocabularies');
    onValue(playerRef, (snapshot) => {
      const newdata = snapshot.val();
      count.current = 0;
      setVocabularies(newdata)
    });
  }
  const onListenStartGame = () => {
    const db = getDatabase();
    const playerRef = ref(db, 'games');
    onValue(playerRef, (snapshot) => {
      const newdata = snapshot.val();
      if (newdata.players) {
        setPlayerList(newdata.players)
      }
      const startGame = Object.keys(newdata.players).every((item) => newdata.players[item].isActive == true)
      if (startGame) {
        setIsStartGame(true);
      }
    });
  }
  function writeUserData(newData: any) {
    const db = getDatabase();
    set(ref(db, 'games/vocabularies'), newData);
  }

  function CreateGame() {
    const db = getDatabase();
    set(ref(db, 'games/winner'), {
      playerWinner: "",
      time: 0
    });
    const newData = take(shuffle(vocabulariesData), 6);
    setCurrentItem(null);
    setCurrentIndex(null);
    count.current = 0;
    setFailedCount(0);
    setWinner(false);
    const newTranscript = newData.map((item) => ({
      id: item?.id,
      title: item?.sName,
      subTitle: null,
    }))
    const newTranslate = newData.map((item) => ({
      id: item?.id,
      title: null,
      subTitle: item?.sType
    }))
    const newShuffleData = shuffle([...newTranscript, ...newTranslate])

    writeUserData(newShuffleData)
  }

  useEffect(() => {
    if (vocabulariesData.length > 0) {
      CreateGame();
    }
  }, [vocabulariesData])

  // useEffect(() => {
  //   if (vocabularies.length <= 0) {
  //     setWinner(true);
  //     // onNextSection();
  //   }
  // }, [vocabularies])
  function onClickCard({ item, index }: any) {

    if (index === currentIndex) {
      setCurrentItem(null)
      setCurrentIndex(null)
      return
    };
    if (!currentItem) {
      setCurrentItem(clone(item))
      setCurrentIndex(index)
    }
    else {
      if (item?.id === currentItem?.id) {
        const newData = vocabularies.filter((item: any) => item?.id != currentItem?.id)
        if (newData?.length <= 0) {
          setWinner(true);
        }
        setVocabularies(clone(newData))
      }
      else if (item?.id !== currentItem?.id) {
        setFailedCount((prev: any) => prev + 1)
        handlePlay(`Don't match`)
      }
      setCurrentItem(null)
      setCurrentIndex(null)
    }
  }

  function onNextSection() {
    count.current = 0
    // setData([...shuffle(data)])
    CreateGame();
  }
  function clearChoose() {
    const db = getDatabase();
    setHasChoose(false)
    Object.keys(playerList).map((key) => {
      set(ref(db, 'games/players/' + key + '/isActive'), false);
    })
  }
  const onClickOk = useCallback(() => {
    if (hasChoose) {
      alert("Bạn đã chọn rồi")
      return;
    }
    const db = getDatabase();
    set(ref(db, 'games/players/' + player + '/isActive'), true);
    setHasChoose(true)
  }, [player, hasChoose])
  function onPressPlayer(item: any) {
    if (playerList[item].isActive || hasChoose) {
      alert("Đã có người khác chọn rồi")
      return;
    }
    setPlayer(item);
  }
  if (!isStartGame) {
    if (!playerList) return null
    return (
      <>
        <Heading>Chọn người chơi</Heading>
        <br></br>
        <br></br>
        <br></br>

        {
          Object.keys(playerList).map((item) => {
            return (
              <WrapItem key={item} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Button style={{ width: '30%' }} onClick={() => onPressPlayer(item)} disabled={true} colorScheme={playerList[item].isActive ? 'gray' : 'pink'} >{playerList[item].name}</Button>
              </WrapItem>
            )
          })

        }
        <br></br>
        <br></br>
        <br></br>
        <hr></hr>
        <br></br>
        <WrapItem style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Button style={{ width: '20%', marginRight: 20 }} onClick={onClickOk} colorScheme={hasChoose ? 'gray' : 'blue'}>Chọn</Button>
          <Button style={{ width: '20%' }} onClick={clearChoose} colorScheme={'blue'}>Reset</Button>
        </WrapItem>
        {/* <WrapItem style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Button style={{ width: '20%' }} onClick={clearChoose} colorScheme={'pink'}>Reset</Button>
        </WrapItem> */}
      </>
    )
  }
  return (
    <>
      <VoiceSelect />
      <Heading id='timeID'></Heading>
      <br /><br /><br />
      {
        failedCount > 3 ? <Heading>Game Over...</Heading> : playerWinner?.playerWinner ? <Heading>Người chiến thắng là: {playerList[playerWinner?.playerWinner]?.name} với thời gian là {playerWinner?.time} s</Heading> :
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(33%, 1fr))'>
            {
              vocabularies?.map((item: any, index: any) => {
                return (
                  <Card className='card-class' style={{
                    borderColor: currentIndex == index ? 'green' : 'white',
                    borderWidth: 2
                  }} key={index.toString()} onClick={() => onClickCard({ item, index })}>
                    <CardHeader>
                      <Heading size='md'>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item?.subTitle}</Text>
                    </CardBody>
                    <VoicePlay text={item?.title} />
                  </Card>
                )
              })
            }
          </SimpleGrid>
      }
      {failedCount > 3 ? null : <WrapItem style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <Button colorScheme='pink' onClick={onNextSection}>{failedCount > 3 ? 'Play again' : 'Next'}</Button>
      </WrapItem>}
    </>
  )
}

export default MultiPlayer
