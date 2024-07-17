import { Accordion, Text, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useCallback, useState } from 'react';
import useTextToSpeech from '../hooks/useTextToSpeech';
import { getVocaloriesData } from '../utils';
let indexExpand: any = {}
const vocabulariesData = getVocaloriesData();
Object.values
const VocabularyLearning = () => {
    let params = useParams()
    const [hideVocabulary, setHideVocabulary] = useState(false)
    const [hideVocabularyType, setHideVocabularyType] = useState(false)
    const { VoiceSelect, VoicePlay } = useTextToSpeech()
    const [enableVoid, setEnableVoid] = useState(true)

    const renderVocabulary = useCallback((parentIndex: number) => {
        indexExpand[`${parentIndex}`] = []
        return vocabulariesData?.slice(parentIndex * 12, (parentIndex + 1) * 12)?.map((item: any, index: any) => {
            if ((hideVocabulary == true && index === 0) || (hideVocabularyType === true && index === 2)) {
                indexExpand[`${parentIndex}`].push(undefined)
            }
            else {
                indexExpand[`${parentIndex}`].push(index)
                // indexExpand[`${(parentIndex * 12) + index}`] = (parentIndex * 12) + index
            }
            return (
                <Accordion marginTop={12} key={`${(parentIndex * 12) + index}_${hideVocabulary}_${hideVocabularyType}`} allowMultiple defaultIndex={indexExpand[`${parentIndex}`]}>
                    <Card>
                        <CardHeader flexDirection={'row'} display={'flex'} justifyContent={'space-between'}>
                            <Heading size='md' color={'green'}>{`${(parentIndex * 12) + index + 1}`}</Heading>
                            <VoicePlay text={item?.sName} />
                        </CardHeader>
                        <CardBody>

                            <Stack divider={<StackDivider />} spacing='4'>
                                <AccordionItem>

                                    <Box>
                                        <AccordionButton >
                                            <Heading size='xs' textTransform='uppercase'>
                                                Từ vựng
                                            </Heading>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </Box>
                                    <AccordionPanel pb={4}>
                                        <Text textAlign={'left'} pt='2' fontSize='large' color={'tomato'}>
                                            {`${item?.sName} ${enableVoid ? item?.sVoid : ''}`}
                                        </Text>
                                    </AccordionPanel>
                                </AccordionItem>

                                <AccordionItem>
                                    <Box>
                                        <AccordionButton >
                                            <Heading size='xs' textTransform='uppercase'>
                                                Giải thích
                                            </Heading>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </Box>
                                    <AccordionPanel pb={4}>

                                        <Text textAlign={'left'} pt='2' fontSize='sm'>
                                            {item?.sExplain}
                                        </Text>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <Box>
                                        <AccordionButton >
                                            <Heading size='xs' textTransform='uppercase'>
                                                Từ loại
                                            </Heading>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </Box>
                                    <AccordionPanel pb={4}>
                                        <Text textAlign={'left'} pt='2' fontSize='large' color={'tomato'}>
                                            {item?.sType}
                                        </Text>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <Box>
                                        <AccordionButton >
                                            <Heading size='xs' textTransform='uppercase'>
                                                Ví dụ
                                            </Heading>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </Box>
                                    <AccordionPanel pb={4}>
                                        <Text textAlign={'left'} pt='2' fontSize='sm'>
                                            {item?.sExample}
                                        </Text>
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <Box>
                                        <AccordionButton >
                                            <Heading size='xs' textTransform='uppercase'>
                                                Dịch nghĩa ví dụ
                                            </Heading>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </Box>
                                    <AccordionPanel pb={4}>
                                        <Text textAlign={'left'} pt='2' fontSize='sm'>
                                            {item?.sTranslate}
                                        </Text>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Stack>
                        </CardBody>
                    </Card>
                </Accordion>

            )
        })

    }, [hideVocabulary, hideVocabularyType, enableVoid])


    return (
        <div id="playgame-container">
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
                <Switch id='hide_vocabulary_type' style={{ marginRight: 20 }} onChange={(ev: any) => {
                    setHideVocabularyType(ev?.target?.checked)
                }} />
                <FormLabel htmlFor='hide_vocabulary_verbalway' mb='0' >
                    Hiện thị phát âm
                </FormLabel>
                <Switch id='hide_vocabulary_verbalway' style={{ marginRight: 20 }} onChange={(ev: any) => {
                    setEnableVoid(ev?.target?.checked)
                }} />

            </FormControl>
            {renderVocabulary(Number(params?.id))}
        </div>
    )
}


export default VocabularyLearning