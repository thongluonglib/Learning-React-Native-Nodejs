import { useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardHeader, CardBody, Heading, SimpleGrid, Text, Button, WrapItem, Switch } from '@chakra-ui/react'
import { clone, shuffle, take, trim } from 'lodash'
import useTextToSpeech from '../hooks/useTextToSpeech'
import vocabulariesDataMock from '../vocabulariesData.json'
import { useParams } from 'react-router-dom'
function OnePlayer() {
  let params: any = useParams();
  let id = Number(params?.id)
  const isFirst = useRef(false)
  const vocabulariesData = useMemo(() => {
    let response = clone(vocabulariesDataMock)

    if (id && id > 0 && !isFirst.current) {
      isFirst.current = true
      let response = clone(vocabulariesDataMock.slice((id * 12) - 12, (id * 12) - 1))
      response = response.map((item: any) => {
        const searchIndex = String(item.sName).search('/')
        if (searchIndex > 0) {
          item.sVoid = trim(String(item.sName).substring(String(item.sName).search('/'), item.sName?.length))
          item.sName = trim(String(item.sName).substring(0, String(item.sName).search('/')))
        }
        return item
      })
      return response
    }
    else {
      response = response.map((item: any) => {
        const searchIndex = String(item.sName).search('/')
        if (searchIndex > 0) {
          item.sVoid = trim(String(item.sName).substring(String(item.sName).search('/'), item.sName?.length))
          item.sName = trim(String(item.sName).substring(0, String(item.sName).search('/')))
        }
        return item
      })
      return response
    }
  }, [])
  const [vocabularies, setVocabularies] = useState<any>([])
  const [currentItem, setCurrentItem] = useState<any>()
  const [currentIndex, setCurrentIndex] = useState<any>()
  let count = useRef(0)
  let timeIdNode: any = useRef(0)
  let [failedCount, setFailedCount] = useState(0)
  let [gameOver, setGameOver] = useState(false)
  let [, setWinner] = useState(false)
  const { handlePlay, VoiceSelect, VoicePlay } = useTextToSpeech()
  const intervalId = useRef<any>(0)
  const [enableVoid, setEnableVoid] = useState(false)
  useEffect(() => {
    if (failedCount > 3) {
      clearInterval(intervalId.current)
      setGameOver(true)
    }
    else {
      if (intervalId.current) {
        clearInterval(intervalId.current)
      }
      timeIdNode.current = document.getElementById('timeID')
      intervalId.current = setInterval(() => {
        count.current += 0.1
        count.current = parseFloat(count.current.toFixed(1))
        timeIdNode.current.innerText = `Time: ${count.current}s`
      }, 100)
    }
    return () => {
      clearInterval(intervalId.current)
    }
  }, [failedCount])


  function CreateGame() {
    const newData = take(shuffle(vocabulariesData), 6);
    count.current = 0;
    setFailedCount(0)
    setWinner(false)
    setGameOver(false)
    const newTranscript = newData.map((item: any) => ({
      id: item?.id,
      title: item?.sName,
      subTitle: null,
      ...item
    }))
    const newTranslate = newData.map((item: any) => ({
      id: item?.id,
      title: null,
      subTitle: item?.sType,
      ...item
    }))
    const newShuffleData = shuffle([...newTranscript, ...newTranslate])
    setVocabularies([...newShuffleData])
    // writeUserData(newData)
  }

  useEffect(() => {
    if (vocabulariesData.length > 0) {
      CreateGame();
    }
  }, [vocabulariesData])

  useEffect(() => {
    if (vocabularies.length <= 0) {
      setWinner(true);
      onNextSection();
    }
  }, [vocabularies])
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
        setVocabularies(clone(newData))
      }
      else if (item?.id !== currentItem?.id) {
        setFailedCount(prev => prev + 1)
        handlePlay(`Don't match`)
      }
      setCurrentItem(null)
      setCurrentIndex(null)
    }
  }

  function onNextSection() {
    count.current = 0
    CreateGame();
  }
  return (
    <div style={{ flex: 1 }}>
      <VoiceSelect />
      <Heading id='timeID'></Heading>
      <label>Hiện thị phát âm </label>
      <Switch onChange={(ev) => {
        setEnableVoid(ev.target.checked)
      }} />
      <br /><br /><br />
      {
        gameOver ? <Heading>Game Over...</Heading> :
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(33%, 1fr))'>
            {
              vocabularies?.length > 0 && vocabularies?.map((item: any, index: any) => {
                return (
                  <Card className='card-class' style={{
                    borderColor: currentIndex == index ? 'green' : 'white',
                    borderWidth: 2
                  }} key={index.toString()} onClick={() => onClickCard({ item, index })}>
                    {item?.title && <CardHeader>
                      <Heading size='md'>{item?.title} {enableVoid == true ? item.sVoid : ''}</Heading>
                    </CardHeader>}
                    <CardBody>
                      <Text>{item?.subTitle}</Text>
                    </CardBody>
                    {item?.title && <VoicePlay text={item?.sName} />}
                  </Card>
                )
              })
            }
          </SimpleGrid>
      }
      <WrapItem style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <Button colorScheme='pink' onClick={onNextSection}>{failedCount > 3 ? 'Play again' : 'Next'}</Button>
      </WrapItem>
    </div>
  )
}

export default OnePlayer
