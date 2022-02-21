import 'remirror/styles/all.css';

import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { Remirror, useRemirror } from '@remirror/react';
import React from 'react';
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  CodeExtension,
  HeadingExtension,
  BlockquoteExtension,
  CalloutExtension,
  HistoryExtension,
  ImageExtension,
  ListItemExtension,
  StrikeExtension,
} from 'remirror/extensions';

import Editor from '../components/Editor';

const Create = () => {
  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new BoldExtension({}),
      new ItalicExtension({}),
      new UnderlineExtension({}),
      new StrikeExtension({}),
      new CodeExtension({}),
      new HeadingExtension({}),
      new BlockquoteExtension({}),
      new HistoryExtension({}),
      new ImageExtension(),
      new CalloutExtension({ defaultType: 'warn' }),
      new ListItemExtension({ enableCollapsible: true }),
    ],
  });

  return (
    <Flex justifyContent="center" mt={2} width="100%">
      <Grid width="100%" templateColumns="10% 90%" mx="auto">
        <GridItem>List</GridItem>
        <GridItem>
          <div className="remirror-theme">
            <Remirror manager={manager} state={state} onChange={(p) => setState(p.state)}>
              <Editor state={state} manager={manager} />
            </Remirror>
          </div>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Create;
