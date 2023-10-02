import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Menu, X } from "react-feather";

const Note = () => {
  const router = useRouter();
  const { chapterSlug } = router.query;
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [openTableOfContent, setOpenTableOfContent] = useState(false)

  const toggleSideMenu = () => setOpenSideMenu(prev => !prev)
  const toggleTableOfContent = () => setOpenTableOfContent(prev => !prev)

  return (
    <div className="grid grid-cols-12 gap-2">
      <Head>
        <title>{chapterSlug}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`fixed bg-white dark:bg-gray-800 top-32 ${openSideMenu?'left-0':'-left-full'} lg:left-0 transition-left px-4 lg:relative lg:top-0 lg:col-span-3 lg:px-1 py-2 h-4/5 overflow-y-scroll`}>
        <div className="flex justify-end mb-5 lg:hidden">
            <X className="cursor-pointer" onClick={toggleSideMenu} />
        </div>
        {
          subject.map(sub => (
            <ul key={sub.id}>
              <li>
                <span className="px-2 py-1 bg-indigo-400 rounded-md cursor-pointer">{sub.subject}</span>
                <ul className="pl-4 mb-8">
                  {
                    sub.chapters.map(ch => (
                      <li key={ch.id} className="my-4 text-gray-500 cursor-pointer hover:text-black dark:hover:text-white">{ch.title}</li>
                    ))
                  }
                </ul>
              </li>
            </ul>
          ))
        }
      </div>
      <div className="h-screen col-span-12 px-4 lg:col-span-6">
        <div className="flex justify-between px-1 py-3 lg:hidden">
          <Menu className="cursor-pointer" onClick={toggleSideMenu} />
          <Menu className="cursor-pointer" onClick={toggleTableOfContent} />
        </div>
        <h3 className="mb-2">
          <span className="px-2 rounded-md bg-indigo-300/30">
          Title of point
          </span>
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam recusandae sit eum repudiandae placeat unde quia pariatur iusto nobis, at officia suscipit. Assumenda, ratione eos maiores adipisci animi temporibus ipsa!
          Dolor sed deserunt laborum magnam numquam rem odio voluptatum esse molestiae totam delectus, hic repudiandae ad ullam accusamus omnis sapiente magni repellat recusandae necessitatibus non. Ducimus esse voluptas mollitia quo.
        </p>
      </div>
      <div className={`fixed bg-white dark:bg-gray-800 top-32 ${openTableOfContent?'right-0':'-right-full'} lg:right-0 transition-right px-4 w-52 lg:relative lg:top-0 lg:col-span-3 lg:px-1 py-2 h-4/5 overflow-y-scroll`}>
        <div className="flex mb-5 lg:hidden">
          <X className="cursor-pointer" onClick={toggleTableOfContent} />
        </div>
        {
          topics.map(topic => (
            <ul key={topic.id}>
              <li>
                <span className="px-2 py-1 bg-indigo-400 rounded-md cursor-pointer">{topic.title}</span>
                <ul className="pl-4 mb-8">
                  {
                    topic.subTopics.map(st => (
                      <li key={st.id} className="my-4 text-gray-500 cursor-pointer hover:text-black dark:hover:text-white">{st.title}</li>
                    ))
                  }
                </ul>
              </li>
            </ul>
          ))
        }
      </div>
    </div>
  );
};

export default Note;

const subject = [
  {
    id: 0,
    subject: 'Computer Network',
    chapters: [
      {
        id: '01',
        title: 'Chapter one',
      },
      {
        id: '02',
        title: 'Chapter two',
      },
      {
        id: '03',
        title: 'Chapter three',
      },
      {
        id: '04',
        title: 'Chapter four',
      },
    ],
  },
  {
    id: 1,
    subject: 'Multimedia',
    chapters: [
      {
        id: '11',
        title: 'Chapter one',
      },
      {
        id: '12',
        title: 'Chapter two',
      },
      {
        id: '13',
        title: 'Chapter three',
      },
      {
        id: '14',
        title: 'Chapter four',
      },
      {
        id: '15',
        title: 'Chapter five',
      },
      {
        id: '16',
        title: 'Chapter six',
      },
      {
        id: '17',
        title: 'Chapter seven',
      },
    ],
  },
  {
    id: 2,
    subject: 'Engineering Economics',
    chapters: [
      {
        id: '21',
        title: 'Chapter one',
      },
      {
        id: '22',
        title: 'Chapter two',
      },
      {
        id: '23',
        title: 'Chapter three',
      },
      {
        id: '24',
        title: 'Chapter four',
      },
    ],
  },
];

const topics = [
  {
    id: '0A',
    title: 'Topic A',
    subTopics: [
      {
        id: '0A1',
        title: 'Sub topic 1',
      },
      {
        id: '0A2',
        title: 'Sub topic 2',
      },
      {
        id: '0A3',
        title: 'Sub topic 3',
      },
    ],
  },
  {
    id: '0B',
    title: 'Topic B',
    subTopics: [
      {
        id: '0B1',
        title: 'Sub topic 1',
      },
      {
        id: '0B2',
        title: 'Sub topic 2',
      },
    ],
  },
];
