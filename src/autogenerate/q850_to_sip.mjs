import { writeFileSync } from 'fs';

const causeCodeTableData = [
  {
    "q850": 0,
    "sip": null,
    "enumeration": "UNSPECIFIED",
    "cause": "Unspecified. No other cause codes applicable.",
    "description": "This is usually given by the router when none of the other codes apply. This cause usually occurs in the same type of situations as cause 1, cause 88, and cause 100."
  },
  {
    "q850": 1,
    "sip": 404,
    "enumeration": "UNALLOCATED_NUMBER",
    "cause": "Unallocated (unassigned) number `[Q.850 value 1]`",
    "description": "This cause indicates that the called party cannot be reached because, although the called party number is in a valid format, it is not currently allocated (assigned)."
  },
  {
    "q850": 2,
    "sip": 404,
    "enumeration": "NO_ROUTE_TRANSIT_NET",
    "cause": "No route to specified transit network (national use) `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received a request to route the call through a particular transit network, which it does not recognize. The equipment sending this cause does not recognize the transit network either because the transit network does not exist or because that particular transit network, while it does exist, does not serve the equipment which is sending this cause."
  },
  {
    "q850": 3,
    "sip": 404,
    "enumeration": "NO_ROUTE_DESTINATION",
    "cause": "No route to destination `[Q.850]`",
    "description": "This cause indicates that the called party cannot be reached because the network through which the call has been routed does not serve the destination desired. This cause is supported on a network dependent basis."
  },
  {
    "q850": 6,
    "sip": null,
    "enumeration": "CHANNEL_UNACCEPTABLE",
    "cause": "channel unacceptable `[Q.850]`",
    "description": "This cause indicates that the channel most recently identified is not acceptable to the sending entity for use in this call."
  },
  {
    "q850": 7,
    "sip": null,
    "enumeration": "CALL_AWARDED_DELIVERED",
    "cause": "call awarded, being delivered in an established channel `[Q.850]`",
    "description": "This cause indicates that the user has been awarded the incoming call, and that the incoming call is being connected to a channel already established to that user for similar calls (e.g. packet-mode x.25 virtual calls)."
  },
  {
    "q850": 16,
    "sip": null,
    "enumeration": "NORMAL_CLEARING",
    "cause": "normal call clearing `[Q.850]`",
    "description": "This cause indicates that the call is being cleared because one of the users involved in the call has requested that the call be cleared. Under normal situations, the source of this cause is not the network."
  },
  {
    "q850": 17,
    "sip": 486,
    "enumeration": "USER_BUSY",
    "cause": "user busy `[Q.850]`",
    "description": "This cause is used to indicate that the called party is unable to accept another call because the user busy condition has been encountered. This cause value may be generated by the called user or by the network. In the case of user determined user busy it is noted that the user equipment is compatible with the call."
  },
  {
    "q850": 18,
    "sip": 408,
    "enumeration": "NO_USER_RESPONSE",
    "cause": "no user responding `[Q.850]`",
    "description": "This cause is used when a called party does not respond to a call establishment message with either an alerting or connect indication within the prescribed period of time allocated."
  },
  {
    "q850": 19,
    "sip": 480,
    "enumeration": "NO_ANSWER",
    "cause": "no answer from user (user alerted) `[Q.850]`",
    "description": "This cause is used when the called party has been alerted but does not respond with a connect indication within a prescribed period of time. Note - This cause is not necessarily generated by Q.931 procedures but may be generated by internal network timers."
  },
  {
    "q850": 20,
    "sip": 480,
    "enumeration": "SUBSCRIBER_ABSENT",
    "cause": "subscriber absent `[Q.850]`",
    "description": "This cause value is used when a mobile station has logged off, radio contact is not obtained with a mobile station or if a personal telecommunication user is temporarily not addressable at any user-network interface. Sofia SIP will normally raise USER_NOT_REGISTERED in such situations."
  },
  {
    "q850": 21,
    "sip": 603,
    "enumeration": "CALL_REJECTED",
    "cause": "call rejected `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause does not wish to accept this call, although it could have accepted the call because the equipment sending this cause is neither busy nor incompatible. The network may also generate this cause, indicating that the call was cleared due to a supplementary service constraint. The diagnostic field may contain additional information about the supplementary service and reason for rejection."
  },
  {
    "q850": 22,
    "sip": 410,
    "enumeration": "NUMBER_CHANGED",
    "cause": "number changed `[Q.850]`",
    "description": "This cause is returned to a calling party when the called party number indicated by the calling party is no longer assigned, The new called party number may optionally be included in the diagnostic field. If a network does not support this cause, cause no: 1, unallocated (unassigned) number shall be used."
  },
  {
    "q850": 23,
    "sip": 410,
    "enumeration": "REDIRECTION_TO_NEW_DESTINATION",
    "cause": null,
    "description": "This cause is used by a general ISUP protocol mechanism that can be invoked by an exchange that decides that the call should be set-up to a different called number. Such an exchange can invoke a redirection mechanism, by use of this cause value, to request a preceding exchange involved in the call to route the call to the new number."
  },
  {
    "q850": 25,
    "sip": 483,
    "enumeration": "EXCHANGE_ROUTING_ERROR",
    "cause": null,
    "description": "This cause indicates that the destination indicated by the user cannot be reached, because an intermediate exchange has released the call due to reaching a limit in executing the hop counter procedure. This cause is generated by an intermediate node, which when decrementing the hop counter value, gives the result 0."
  },
  {
    "q850": 27,
    "sip": 502,
    "enumeration": "DESTINATION_OUT_OF_ORDER",
    "cause": "destination out of order `[Q.850]`",
    "description": "This cause indicates that the destination indicated by the user cannot be reached because the interface to the destination is not functioning correctly. The term \"not functioning correctly\" indicates that a signal message was unable to be delivered to the remote party; e.g. a physical layer or data link layer failure at the remote party, or user equipment off-line."
  },
  {
    "q850": 28,
    "sip": 484,
    "enumeration": "INVALID_NUMBER_FORMAT",
    "cause": "invalid number format (address incomplete) `[Q.850]`",
    "description": "This cause indicates that the called party cannot be reached because the called party number is not in a valid format or is not complete."
  },
  {
    "q850": 29,
    "sip": 501,
    "enumeration": "FACILITY_REJECTED",
    "cause": "facilities rejected `[Q.850]`",
    "description": "This cause is returned when a supplementary service requested by the user cannot be provide by the network."
  },
  {
    "q850": 30,
    "sip": null,
    "enumeration": "RESPONSE_TO_STATUS_ENQUIRY",
    "cause": "response to STATUS INQUIRY `[Q.850]`",
    "description": "This cause is included in the STATUS message when the reason for generating the STATUS message was the prior receipt of a STATUS INQUIRY."
  },
  {
    "q850": 31,
    "sip": 480,
    "enumeration": "NORMAL_UNSPECIFIED",
    "cause": "normal, unspecified `[Q.850]`",
    "description": "This cause is used to report a normal event only when no other cause in the normal class applies."
  },
  {
    "q850": 34,
    "sip": 503,
    "enumeration": "NORMAL_CIRCUIT_CONGESTION",
    "cause": "no circuit/channel available `[Q.850]`",
    "description": "This cause indicates that there is no appropriate circuit/channel presently available to handle the call."
  },
  {
    "q850": 38,
    "sip": 502,
    "enumeration": "NETWORK_OUT_OF_ORDER",
    "cause": "network out of order `[Q.850]`",
    "description": "This cause indicates that the network is not functioning correctly and that the condition is likely to last a relatively long period of time e.g. immediately re-attempting the call is not likely to be successful."
  },
  {
    "q850": 41,
    "sip": 503,
    "enumeration": "NORMAL_TEMPORARY_FAILURE",
    "cause": "temporary failure `[Q.850]`",
    "description": "This cause indicates that the network is not functioning correctly and that the condition is not likely to last a long period of time; e.g. the user may wish to try another call attempt almost immediately."
  },
  {
    "q850": 42,
    "sip": 503,
    "enumeration": "SWITCH_CONGESTION",
    "cause": "switching equipment congestion `[Q.850]`",
    "description": "This cause indicates that the switching equipment generating this cause is experiencing a period of high traffic."
  },
  {
    "q850": 43,
    "sip": null,
    "enumeration": "ACCESS_INFO_DISCARDED",
    "cause": "access information discarded `[Q.850]`",
    "description": "This cause indicates that the network could not deliver access information to the remote user as requested, i.e. user-to-user information, low layer compatibility, high layer compatibility or sub-address as indicated in the diagnostic. It is noted that the particular type of access information discarded is optionally included in the diagnostic."
  },
  {
    "q850": 44,
    "sip": 503,
    "enumeration": "REQUESTED_CHAN_UNAVAIL",
    "cause": "requested circuit/channel not available `[Q.850]`",
    "description": "This cause is returned when the other side of the interface cannot provide the circuit or channel indicated by the requesting entity."
  },
  {
    "q850": 45,
    "sip": null,
    "enumeration": "PRE_EMPTED",
    "cause": null,
    "description": null
  },
  {
    "q850": 47,
    "sip": null,
    "enumeration": null,
    "cause": "resource unavailable, unspecified `[Q.850]`",
    "description": "This cause is used to report a resource unavailable event only when no other cause in the resource unavailable class applies."
  },
  {
    "q850": 50,
    "sip": null,
    "enumeration": "FACILITY_NOT_SUBSCRIBED",
    "cause": "requested facility not subscribed [Q.850",
    "description": "This cause indicates that the user has requested a supplementary service, which is available, but the user is not authorized to use."
  },
  {
    "q850": 52,
    "sip": 403,
    "enumeration": "OUTGOING_CALL_BARRED",
    "cause": "outgoing calls barred",
    "description": "This cause indicates that although the calling party is a member of the CUG for the outgoing CUG call, outgoing calls are not allowed for this member of the CUG."
  },
  {
    "q850": 54,
    "sip": 403,
    "enumeration": "INCOMING_CALL_BARRED",
    "cause": "incoming calls barred",
    "description": "This cause indicates that although the called party is a member of the CUG for the incoming CUG call, incoming calls are not allowed to this member of the CUG."
  },
  {
    "q850": 57,
    "sip": 403,
    "enumeration": "BEARERCAPABILITY_NOTAUTH",
    "cause": "bearer capability not authorized `[Q.850]`",
    "description": "This cause indicates that the user has requested a bearer capability that is implemented by the equipment which generated this cause but the user is not authorized to use."
  },
  {
    "q850": 58,
    "sip": 503,
    "enumeration": "BEARERCAPABILITY_NOTAVAIL",
    "cause": "bearer capability not presently available `[Q.850]`",
    "description": "This cause indicates that the user has requested a bearer capability which is implemented by the equipment which generated this cause but which is not available at this time."
  },
  {
    "q850": 63,
    "sip": null,
    "enumeration": "SERVICE_UNAVAILABLE",
    "cause": "service or option not available, unspecified `[Q.850]`",
    "description": "This cause is used to report a service or option not available event only when no other cause in the service or option not available class applies."
  },
  {
    "q850": 65,
    "sip": 488,
    "enumeration": "BEARERCAPABILITY_NOTIMPL",
    "cause": "bearer capability not implemented `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause does not support the bearer capability requested."
  },
  {
    "q850": 66,
    "sip": null,
    "enumeration": "CHAN_NOT_IMPLEMENTED",
    "cause": "channel type not implemented `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause does not support the channel type requested"
  },
  {
    "q850": 69,
    "sip": 501,
    "enumeration": "FACILITY_NOT_IMPLEMENTED",
    "cause": "requested facility not implemented `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause does not support the requested supplementary services."
  },
  {
    "q850": 79,
    "sip": 501,
    "enumeration": "SERVICE_NOT_IMPLEMENTED",
    "cause": "service or option not implemented, unspecified `[Q.850]`",
    "description": "This cause is used to report a service or option not implemented event only when no other cause in the service or option not implemented class applies."
  },
  {
    "q850": 81,
    "sip": null,
    "enumeration": "INVALID_CALL_REFERENCE",
    "cause": "invalid call reference value `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received a message with a call reference which is not currently in use on the user-network interface."
  },
  {
    "q850": 88,
    "sip": 488,
    "enumeration": "INCOMPATIBLE_DESTINATION",
    "cause": "incompatible destination `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received a request to establish a call which has low layer compatibility, high layer compatibility or other compatibility attributes (e.g. data rate) which cannot be accommodated."
  },
  {
    "q850": 95,
    "sip": null,
    "enumeration": "INVALID_MSG_UNSPECIFIED",
    "cause": "invalid message, unspecified `[Q.850]`",
    "description": "This cause is used to report an invalid message event only when no other cause in the invalid message class applies."
  },
  {
    "q850": 96,
    "sip": null,
    "enumeration": "MANDATORY_IE_MISSING",
    "cause": "mandatory information element is missing `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received a message which is missing an information element which must be present in the message before that message can be processed."
  },
  {
    "q850": 97,
    "sip": null,
    "enumeration": "MESSAGE_TYPE_NONEXIST",
    "cause": "message type non-existent or not implemented `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received a message with a message type it does not recognize either because this is a message not defined of defined but not implemented by the equipment sending this cause."
  },
  {
    "q850": 98,
    "sip": null,
    "enumeration": "WRONG_MESSAGE",
    "cause": "message not compatible with call state or message type non-existent or not implemented. `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received a message such that the procedures do not indicate that this is a permissible message to receive while in the call state, or a STATUS message was received indicating an incompatible call state."
  },
  {
    "q850": 99,
    "sip": null,
    "enumeration": "IE_NONEXIST",
    "cause": "Information element / parameter non-existent or not implemented `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received a message which includes information element(s)/parameter(s) not recognized because the information element(s)/parameter name(s) are not defined or are defined but not implemented by the equipment sending the cause. This cause indicates that the information element(s)/parameter(s) were discarded. However, the information element is not required to be present in the message in order for the equipment sending the cause to process the message."
  },
  {
    "q850": 100,
    "sip": null,
    "enumeration": "INVALID_IE_CONTENTS",
    "cause": "Invalid information element contents `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received and information element which it has implemented; however, one or more fields in the I.E. are coded in such a way which has not been implemented by the equipment sending this cause."
  },
  {
    "q850": 101,
    "sip": null,
    "enumeration": "WRONG_CALL_STATE",
    "cause": "message not compatible with call state `[Q.850]`",
    "description": "This cause indicates that a message has been received which is incompatible with the call state."
  },
  {
    "q850": 102,
    "sip": 504,
    "enumeration": "RECOVERY_ON_TIMER_EXPIRE",
    "cause": "recovery on timer expiry `[Q.850]`",
    "description": "This cause indicates that a procedure has been initiated by the expiration of a timer in association with error handling procedures. This is often associated with NAT problems. Ensure that \"NAT Mapping Enable\" is turned on in your ATA. If it is not NAT related it can sometimes be provider related, make sure to ensure another outbound provider does not solve the problem.FreeSWITCH also returns this when the remote party sends a 408 for call expired."
  },
  {
    "q850": 103,
    "sip": null,
    "enumeration": "MANDATORY_IE_LENGTH_ERROR",
    "cause": "parameter non-existent or not implemented - passed on (national use) `[Q.850]`",
    "description": "This cause indicates that the equipment sending this cause has received a message which includes parameters not recognized because the parameters are not defined or are defined but not implemented by the equipment sending this cause. The cause indicates that the parameter(s) were ignored. In addition, if the equipment sending this cause is an intermediate point, then this cause indicates that the parameter(s) were passed unchanged."
  },
  {
    "q850": 111,
    "sip": null,
    "enumeration": "PROTOCOL_ERROR",
    "cause": "protocol error, unspecified `[Q.850]`",
    "description": "This cause is used to report a protocol error event only when no other cause in the protocol error class applies."
  },
  {
    "q850": 127,
    "sip": null,
    "enumeration": "INTERWORKING",
    "cause": "Interworking, unspecified `[Q.850]`",
    "description": "This cause indicates that an interworking call (usually a call to SW56 service) has ended."
  },
  {
    "q850": 487,
    "sip": 487,
    "enumeration": "ORIGINATOR_CANCEL",
    "cause": null,
    "description": null
  },
  {
    "q850": 500,
    "sip": null,
    "enumeration": "CRASH",
    "cause": null,
    "description": null
  },
  {
    "q850": 501,
    "sip": null,
    "enumeration": "SYSTEM_SHUTDOWN",
    "cause": null,
    "description": null
  },
  {
    "q850": 502,
    "sip": null,
    "enumeration": "LOSE_RACE",
    "cause": null,
    "description": null
  },
  {
    "q850": 503,
    "sip": null,
    "enumeration": "MANAGER_REQUEST",
    "cause": null,
    "description": "This cause is used when you send an api command to make it hangup. For example `uuid_kill <uuid>`"
  },
  {
    "q850": 600,
    "sip": null,
    "enumeration": "BLIND_TRANSFER",
    "cause": null,
    "description": null
  },
  {
    "q850": 601,
    "sip": null,
    "enumeration": "ATTENDED_TRANSFER",
    "cause": null,
    "description": null
  },
  {
    "q850": 602,
    "sip": null,
    "enumeration": "ALLOTTED_TIMEOUT",
    "cause": null,
    "description": "This cause means that the server canceled the call because the destination channel took too long to answer."
  },
  {
    "q850": 603,
    "sip": null,
    "enumeration": "USER_CHALLENGE",
    "cause": null,
    "description": null
  },
  {
    "q850": 604,
    "sip": null,
    "enumeration": "MEDIA_TIMEOUT",
    "cause": null,
    "description": null
  },
  {
    "q850": 605,
    "sip": null,
    "enumeration": "PICKED_OFF",
    "cause": null,
    "description": "This cause means the call was picked up by intercepting it from another extension (i.e. dialing **ext_number from another extension)."
  },
  {
    "q850": 606,
    "sip": null,
    "enumeration": "USER_NOT_REGISTERED",
    "cause": null,
    "description": "This means you tried to originate a call to a SIP user who forgot to register."
  },
  {
    "q850": 607,
    "sip": null,
    "enumeration": "PROGRESS_TIMEOUT",
    "cause": null,
    "description": "See: progress_timeout"
  },
  {
    "q850": 609,
    "sip": null,
    "enumeration": "GATEWAY_DOWN",
    "cause": null,
    "description": "Gateway is down (not answering on OPTIONS or SUBSCRIBE)"
  }
];

/** 
 * Surround a string in backticks unless it is `null` or `undefined`.
 */
function backtick(val) {
  if (val !== null && val !== undefined) {
    return `\`${val}\``;
  }
  return "";
}

function row(q850, sip, enumeration, cause, description) {
  return `| ${backtick(q850)} | ${backtick(sip)} | ${backtick(enumeration)}| ${cause} | ${description} |\n`;
}

function rows() {
   let rowz = "";

   for (let r of causeCodeTableData) {
    const { q850, sip, enumeration, cause, description } = r;
    rowz = rowz.concat(row(q850, sip, enumeration, cause, description));
   }

   return rowz;
}

function generateMarkdownTable() {
  return `
| ITU-T Q.850 Code | [Sip Equiv.](./SIP-Protocol-Messages) | Enumeration | Cause | Description |
|------------------|---------------------------------------|-------------|-------|-------------|
${rows()}`;
}

export default function generateCauseCodeMarkdownTable() {
  try {
      const path = "docs/FreeSWITCH-Explained/Troubleshooting-Debugging/_Q850-to-SIP-Code-Table.mdx";
      writeFileSync(path, generateMarkdownTable());
  } catch (err) {
      console.error(err);
  }
}
