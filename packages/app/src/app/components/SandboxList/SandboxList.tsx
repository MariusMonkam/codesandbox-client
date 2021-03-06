import getIcon from '@codesandbox/common/lib/templates/icons';
import { SmallSandbox } from '@codesandbox/common/lib/types';
import { getSandboxName } from '@codesandbox/common/lib/utils/get-sandbox-name';
import { sandboxUrl } from '@codesandbox/common/lib/utils/url-generator';
import { format } from 'date-fns';
import * as React from 'react';
import EyeIcon from 'react-icons/lib/fa/eye';
import FullHeartIcon from 'react-icons/lib/fa/heart';
import ForkIcon from 'react-icons/lib/go/repo-forked';
import { Link } from 'react-router-dom';

import { DeleteSandboxButton } from '../DeleteSandboxButton';
import { PrivacyStatus } from '../PrivacyStatus';
import {
  Body,
  DeleteBody,
  HeaderRow,
  HeaderTitle,
  SandboxRow,
  StatBody,
  StatTitle,
  Table,
} from './elements';

interface ISandboxListProps {
  sandboxes: SmallSandbox[];
  isCurrentUser: boolean;
  onDelete: (id: string) => void;
}

export const SandboxList: React.FC<ISandboxListProps> = ({
  sandboxes,
  isCurrentUser,
  onDelete,
}) => (
  <Table>
    <thead>
      <HeaderRow>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderTitle>Created</HeaderTitle>
        <HeaderTitle>Updated</HeaderTitle>
        <StatTitle />
        <StatTitle>
          <FullHeartIcon />
        </StatTitle>
        <StatTitle>
          <EyeIcon />
        </StatTitle>
        <StatTitle>
          <ForkIcon />
        </StatTitle>
        {isCurrentUser && <HeaderTitle />}
      </HeaderRow>
    </thead>
    <Body>
      {sandboxes.map((s, i) => {
        // TODO: investigate type mismatch between SmallSandbox and getIcon
        // @ts-ignore
        const Icon = getIcon(s.template);

        return (
          <SandboxRow delay={i} key={s.id}>
            <td>
              {/* We should probably use the Sandbox interface instead
                 * of SmallSandbox
                // @ts-ignore */}
              <Link to={sandboxUrl(s)}>{getSandboxName(s)}</Link>
              <PrivacyStatus privacy={s.privacy} asIcon />
            </td>
            <td>{format(new Date(s.insertedAt), 'MMM dd, yyyy')}</td>
            <td>{format(new Date(s.updatedAt), 'MMM dd, yyyy')}</td>
            <StatBody>
              <Icon width={30} height={30} />
            </StatBody>
            <StatBody>{s.likeCount}</StatBody>
            <StatBody>{s.viewCount}</StatBody>
            <StatBody>{s.forkCount}</StatBody>
            {isCurrentUser && onDelete ? (
              <DeleteBody>
                <DeleteSandboxButton id={s.id} onDelete={onDelete} />
              </DeleteBody>
            ) : null}
          </SandboxRow>
        );
      })}
    </Body>
  </Table>
);
