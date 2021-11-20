import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

import { Playlist } from '@nuclear/core/src/helpers/playlist/types';
import { Playlists as PlaylistsTable } from '@nuclear/ui';

import PlaylistsHeader from './PlaylistsHeader';
import styles from './styles.scss';
import { useHistory } from 'react-router-dom';

const EmptyState = () => {
  const { t } = useTranslation('playlists');
  return (
    <div className={styles.empty_state}>
      <Icon.Group>
        <Icon name='list alternate outline' />
      </Icon.Group>
      <h2>{t('empty')}</h2>
      <div>{t('empty-help')}</div>
    </div>
  );
};

type PlaylistsProps = {
  playlists: Playlist[];
  handleImportFromFile: React.MouseEventHandler;
  createNew: (name: string) => void;
}

const Playlists: React.FC<PlaylistsProps> = ({
  playlists,
  handleImportFromFile,
  createNew
}) => {
  const history = useHistory();
  const { t, i18n } = useTranslation('playlists');
  
  function isPlaylistsReallyEmpty() {
    return (
      !playlists || Object.keys(playlists).length === 0 || playlists.length === 0
    );
  }

  function isPlaylistsReallyNotEmpty() {
    return playlists && playlists.length > 0;
  }

  const strings = {
    tracksSingular: t('tracks-singular'),
    tracksPlural: t('tracks-plural'),
    modifiedAt: t('modified-at'),
    neverModified: t('never-modified'),
    serverModifiedAt: t('server-modified-at'),
    uploadToServer: t('upload-to-server'),
    downloadFromServer: t('download-from-server'),
    locale: i18n.language
  };

  const callbacks = {
    onPlaylistDownload: () => {},
    onPlaylistUpload: () => {},
    onPlaylistClick: (id: string) => history.push(`/playlist/${id}`),
    onDragEnd: () => {}
  };

  return (
    <div className={styles.playlists_container}>
      <PlaylistsHeader
        showText={isPlaylistsReallyNotEmpty()}
        handleImportFromFile={handleImportFromFile}
        createNew={createNew}
      />
      {
        isPlaylistsReallyEmpty() &&
        <EmptyState />
      }

      {
        isPlaylistsReallyNotEmpty() &&
        <PlaylistsTable
          displayModificationDates
          playlists={playlists}

          {...strings}
          {...callbacks}
        />
      }

    </div>
  );
};

export default Playlists;
