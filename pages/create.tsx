import 'remirror/styles/all.css';

import { RemirrorManager, ExtensionPriority } from '@remirror/core';
import { CorePreset } from '@remirror/preset-core';

import React, { useState } from 'react';

import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { Remirror, useRemirror, useRemirrorContext } from '@remirror/react';
import { getDownloadURL, uploadString, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  StrikeExtension,
  HeadingExtension,
  BlockquoteExtension,
  CodeExtension,
  HistoryExtension,
  CalloutExtension,
  ImageExtension,
  ListItemExtension,
} from 'remirror/extensions';
import { storage } from '../firebase/clientApp';

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
      /* new ImageExtension({uploadHandler: handlerUpload})*/
      new ImageExtension({ enableResizing: true }),
      new CalloutExtension({ defaultType: 'warn' }),
      new ListItemExtension({ enableCollapsible: true }),
    ],
  });

  // const handlerUpload = (files:FileWithProgress[]) =>{
  //   console.log(files,"files");
  //   return files;

  const handleChange = (p) => {
    for (let i = 0; i < p.state.doc.content.content.length; i++) {
      const len = p.state.doc.content.content[i].content.content.length;
      for (let j = 0; j < len; j++) {
        if (p.state.doc.content.content[i].content.content[j].attrs.fileName) {
          const file = p.state.doc.content.content[i].content.content[j].attrs;
          changeHandler(file, i, j, p.state);
        }
      }
    }
    setState(p.state);
  };

  function changeHandler(file, i, j, state) {
    if (!file) return;
    console.log('in side of function');

    const storageRef = ref(storage, `/files2/${file.fileName}`);
    const uploadTask = uploadString(storageRef, file.src, 'data_url');

    uploadTask.then((snapshot) => {
      const newState = state;
      getDownloadURL(snapshot.ref).then((url) => {
        // console.log(url, 'url of snapshot');

        newState.doc.content.content[i].content.content[j].attrs.src = url;
        setState(newState);
        console.log(newState, 'newstate');

        // console.log(newState.doc.content.content,"lasttt<<<<<<>>>>>>>>>");
      });
    });
  }

  return (
    <Flex justifyContent="center" mt={2} width="100%">
      <Grid width="100%" templateColumns="10% 90%" mx="auto">
        <GridItem>List</GridItem>
        <GridItem>
          <div className="remirror-theme">
            <Remirror manager={manager} state={state} onChange={handleChange}>
              <Editor state={state} manager={manager} />
            </Remirror>
          </div>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Create;
