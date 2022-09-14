/* eslint-disable no-underscore-dangle */
import React, { ReactNode } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import FeedbackForm from "components/CMSContent/FeedbackForm";
import TextWithQuery from './TextWithQuery'
import StyledTextImage from './StyledTextImage'
import CMSBlock from './CMSBlock'
import ArticleSelector from './ArticleSelector'
import CoverageSummary from './CoverageSummary'

interface Props {
  content: Array<any>
}

const DynamicZone = ({ content }: Props) => {
  const rendered: Array<ReactNode> = []

  content?.forEach((block) => {
    switch (block.__component) {
      case 'shared.styled-text-image':
        rendered.push(<StyledTextImage key={`STI${block.id}`} block={block} />)
        break

      case 'shared.text-block':
        rendered.push(<TextWithQuery key={`T${block.id}`} block={block} />)
        break

      case 'shared.coverage-summary':
        rendered.push(<CoverageSummary key={`T${block.id}`} block={block} />)
        break

      case 'shared.article-selector':
        rendered.push(<ArticleSelector key={`AS${block.id}`} block={block} />)
        break

      case 'shared.i-frame':
        rendered.push(<CMSBlock extended><iframe key={`AS${block.id}`} src={block.URL} height={block.Height} width="100%" title={block.id}/></CMSBlock>)
        break

      case 'shared.feedback-form':
        rendered.push(<FeedbackForm key={`AS${block.id}`} block={block}/>)
        break

      default:
        rendered.push(
          <CMSBlock key={`A${block.id}`}>
            <Alert status="warning">
              <AlertIcon />
              <AlertTitle>Unknown CMS content type!</AlertTitle>
              <AlertDescription>
                We do not know how to render a block of type &nbsp;
                <b>{block.__component}</b>.
              </AlertDescription>
            </Alert>
          </CMSBlock>
        )
        break
    }
  })

  return <>{rendered}</>
}

export default DynamicZone