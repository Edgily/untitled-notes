import React, { useState, useEffect } from 'react';
import { collection, getDocsFromServer, query, where, orderBy, limit } from 'firebase/firestore';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Text,
  Input,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/clientApp';

const NotesList = () => {
  const [displayName, setDisplayName] = useState('');
  const [notes, setNotes] = useState<any>(undefined);
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const router = useRouter();

  useEffect(() => {
    if (!user?.accessToken) {
      router.push('/auth');
    } else {
      if (!notes) {
        const listUserNotes = query(
          collection(db, 'notes'),
          where('user', '==', user.uid),
          orderBy('created_at', 'desc'),
          limit(10)
        );
        getDocsFromServer(listUserNotes).then((data) => {
          console.log('data : ', data);
          const notesArr = [];
          data.forEach((doc) => {
            notesArr.push(doc.data());
          });
          setNotes(notesArr);
        });
      }
    }
  }, []);
  console.log('notes: ', notes);

  return (
    <>
      <>
        <Button display={{ md: 'none' }} mb="1" ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Open
        </Button>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{displayName}s Notes</DrawerHeader>
            <DrawerBody>
              {notes
                ? notes.map((note) => {
                    if (note.content.content[0].content && note.content.content[0].content[0]?.text) {
                      return <p>{note.content.content[0].content[0].text}</p>;
                    } else {
                      return 'untitled';
                    }
                  })
                : 'untitled'}
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>

      <Box w="100%" h={80} borderWidth={1} borderRadius="lg" p="3" isTruncated>
        <div>
          <Heading
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="md"
            letterSpacing="wide"
            color="teal.600"
            pb={3}
          >
            Your notes
          </Heading>
          {notes
            ? notes.map((note) => {
                if (note.content.content[0].content && note.content.content[0].content[0]?.text) {
                  return (
                    <Text fontSize="sm" isTruncated>
                      {note.content.content[0].content[0].text}
                      <hr></hr>
                    </Text>
                  );
                } else {
                  return 'untitled';
                }
              })
            : 'untitled'}
        </div>
      </Box>
    </>
  );
};

export default NotesList;
