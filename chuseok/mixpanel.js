/**
 * @description 이벤트 참여 시작했을 경우 (시작 페이지 도달 시)
 * @function event_start
 */
export const event_start = (id) => {
  mixpanel.track('event_start', {
    event_start_id: id,
  });
};

/**
 * @description 이벤트 참여 완료했을 경우 (마지막 페이지 도달 시)
 * @function event_complete
 */
export const event_complete = (id, data, total) => {
  mixpanel.track('event_complete', {
    event_complete_id: id,
    event_complete_save: data,
    event_complete_total: total,
  });
};

/**
 * @description 이탈한 이벤트 ID
 * @function event_exit
 */
export const event_exit = (id) => {
  mixpanel.track('event_exit', {
    event_exit_id: id,
  });
};
