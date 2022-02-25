import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { collection, getDocsFromServer, limit, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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
  }, [notes, router, user.uid, user?.accessToken]);

//drag and droping

function dragStart(event) {
  console.log(event.target.id,"<><>");
  alert("drag start")
  // event.dataTransfer.setData("Text", event.target.id);
}

function dragging(event) {
  // document.getElementById("demo").innerHTML = "The p element is being dragged";
  // alert("Dragging")
  console.log("dragging");
}

function allowDrop(event) {
  event.preventDefault();
  alert("allowdrop")
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("Text");
  event.target.appendChild(document.getElementById(data));
  document.getElementById("demo").innerHTML = "The p element was dropped";
  alert("drop")
}

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
                    <Text fontSize="sm" >{  /*isTruncated */}
                 <div onDrop={drop} onDragOver={allowDrop}>
                    <p onDragStart={dragStart} onDrag={dragging}  draggable="true">{note.content.content[0].content[0].text}</p>
                  </div>

                
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
