import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import useWindowDimensions from '@Hooks/windowDimention';
import { ReactSVG } from 'react-svg';
import styles from './MaintenanceNotification.module.scss';

const MaintenanceNotification = ({ notificationData, environment }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [notiClose, setNotiClose] = useState(false);
  const [maintenanceStartDate, maintenanceEndDate] = [
    notificationData.maintenanceStartDate,
    notificationData.maintenanceEndDate,
  ];
  // for notification close
  const notiCloseClick = () => {
    setNotiClose(true);
  };
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <>
      <div
        className={`notification-banner bg-secondary py-3 text-center position-relative ${
          environment === 'stage' ? 'border-bottom border-primary' : ''
        } ${notiClose === true ? 'd-none' : ''}`}
      >
        <Container>
          <p className="m-0 font-size-lg text-dark">
            Our website will be undergoing maintenance from
            <span className="font-weight-bold"> {maintenanceStartDate} </span>
            until
            <span className="font-weight-bold"> {maintenanceEndDate} </span>
            and will be temporarily unavailable during this time.
          </p>
          <Button
            onClick={notiCloseClick}
            variant="link"
            className="acc-notification-close position-absolute border-0 right top d-flex align-items-center h-100 px-3 cursor-pointer"
          >
            <ReactSVG
              src="/assets/images/icons/close.svg"
              className={styles['acc-close-icon']}
            />
          </Button>
        </Container>
      </div>
    </>
  );
};

export default MaintenanceNotification;
