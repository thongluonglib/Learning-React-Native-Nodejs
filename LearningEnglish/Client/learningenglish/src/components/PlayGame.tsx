import { Accordion, AccordionButton, AccordionItem, Box, Button, Input, Tab, TabList, TabPanel, TabPanels, Tabs, WrapItem, FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import MultiPlayer from './MultiPlayer';
import { useMemo, useState } from 'react';
import useTextToSpeech from '../hooks/useTextToSpeech';
import { getVocaloriesData } from '../utils';
const vocabulariesData = getVocaloriesData();
const PlayGame = () => {
    const navigateTo = useNavigate();
    const [hideVocabulary, setHideVocabulary] = useState(false)
    const [hideVocabularyType, setHideVocabularyType] = useState(false)

    const { VoiceSelect } = useTextToSpeech()

    const renderPartList = useMemo(() => {
        return Array(Math.floor(vocabulariesData?.length / 12)).fill(0).map((_, index) => {
            return (
                <AccordionItem key={`Part_${index}`}>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }} onClick={() => {
                            navigateTo(`VocabularyLearning/${index}`)
                        }}>
                            <Box as='span' flex='1' textAlign='left'>
                                Part {index + 1}
                            </Box>
                        </AccordionButton>
                    </h2>
                </AccordionItem>
            )
        })
    }, [hideVocabulary, hideVocabularyType])
    return (
        <div id="playgame-container">
            <Tabs isFitted variant='enclosed' style={{ width: '100%' }}>
                <TabList mb='1em'>
                    <Tab>Học từ vựng</Tab>
                    <Tab>Luyện tập</Tab>
                    <Tab>Luyện tập với bạn bè</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <VoiceSelect />
                        <FormControl display='flex' alignItems='center' style={{ marginBottom: 20 }} >
                            <FormLabel htmlFor='hide_vocabulary' mb='0'>
                                Ẩn từ vựng
                            </FormLabel>
                            <Switch id='hide_vocabulary' style={{ marginRight: 20 }} onChange={(ev: any) => {
                                setHideVocabulary(ev?.target?.checked)
                            }} />

                            <FormLabel htmlFor='hide_vocabulary_type' mb='0' >
                                Ẩn từ loại
                            </FormLabel>
                            <Switch id='hide_vocabulary_type' onChange={(ev: any) => {
                                setHideVocabularyType(ev?.target?.checked)
                            }} />
                        </FormControl>

                        <Accordion allowToggle>
                            {renderPartList}
                        </Accordion>
                    </TabPanel>
                    <TabPanel>
                        <WrapItem style={{ marginBottom: 20, flexDirection: 'column' }}>
                            <Input type="number" style={{ marginRight: 12 }} id='partId' placeholder={`Enter your part 1->${vocabulariesData?.length / 12}`} />
                            <br />
                            <Button colorScheme='pink' onClick={() => {
                                const partNode: string | any = document.getElementById('partId')
                                navigateTo(`/oneplayer/${partNode?.value}`)
                            }}>Play</Button>
                        </WrapItem>
                    </TabPanel>
                    <TabPanel>
                        <MultiPlayer />
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* <WrapItem>
                <Button colorScheme='pink' onClick={() => {
                    navigateTo('/multiplayer')
                }}>Play With Friends</Button>
            </WrapItem> */}
        </div>
    )
}


export default PlayGame